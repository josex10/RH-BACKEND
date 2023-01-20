import { Controller, Post, Body, Response, UseGuards, HttpCode, HttpStatus, InternalServerErrorException, BadRequestException, HttpException, Get } from '@nestjs/common';
//TODO: NEED TO REMOVE SOON
import { HttpResponseCommon } from 'src/commons/helpers/http_response.common';
import { Response as Res } from 'express';
//TODO: NEED TO REMOVE SOON
import { AuthService } from './auth.service';
import { MasterUserService } from '../master_user/master_user.service';
import { SystemCompanyService } from '../system_company/system_company.service';
import { SystemUserService } from '../system_user/system_user.service';
import { SystemCompanyRegisterAuthDto, SystemUserRegisterDto, AnyUserLoginAuthDto, MasterUserRegisterAuthDto } from './dto';
import { AtGuard, RtGuard } from 'src/commons/guards';
import { GetCurrentUser, GetCurrentUserId } from '../../commons/decorators';
import { TAuthLoginResponse, TSystemUserPublic } from 'src/commons/types';
import { EGeneralActive, ESystemMsg } from '../../commons/enums';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,  
    private readonly masterUserService: MasterUserService, 
    private readonly systemCompanyService: SystemCompanyService,
    private readonly systemUserService: SystemUserService
    ) {}

  @Post('register/user-master')
  async registerUserMaster(@Response() res: Res,@Body() registerMasterUserAuthDto: MasterUserRegisterAuthDto) {
    try {

      const userByEmail = await this.masterUserService.findByEmail(registerMasterUserAuthDto.clm_email);
      if(userByEmail.length){
        return HttpResponseCommon.response409(res, null, 'Master User email is already registed.');   
      }

      const masterUserCreated = await  this.authService.registerUserMaster(registerMasterUserAuthDto);
      const {clm_password, ...tmpMasterUser} = masterUserCreated;

      return HttpResponseCommon.response201(res, tmpMasterUser, 'Master User registered Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  @Post('login/user-master')
  async loginUserMaster(@Response() res: Res,@Body() incomingMasterUser: AnyUserLoginAuthDto) {
    try {
      const storedMasterUser = await this.masterUserService.findByUsernameForLogin(incomingMasterUser.clm_username);
      if(!storedMasterUser){
        return HttpResponseCommon.response404(res, null, 'Master User Not Found.');   
      }

      if(!storedMasterUser.clm_is_active){
        return HttpResponseCommon.response401(res, null, 'Master User account is disable.');   
      }

      const comparePwd = await this.authService.fnComparePassword(incomingMasterUser.clm_password, storedMasterUser.clm_password);
      if(!comparePwd){
        return HttpResponseCommon.response409(res, null, 'Master User password is wrong.'); 
      }

      const token = this.authService.fnCreateTokerForMasterUser(storedMasterUser);
      const {clm_password, ...tmpMasterUser} = storedMasterUser;

      const response = {
        masterUser: tmpMasterUser, 
        token
      }
      return HttpResponseCommon.response200(res, response, 'Master User Login Successfully'); 

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  @Post('register/system-company')
  async systemCompanyRegister(@Response() res: Res,@Body() systemCompanyRegisterAuthDto: SystemCompanyRegisterAuthDto) {
    try {

      const groupOfSystemCompanyByEmail = await this.systemCompanyService.fnFindByEmail(systemCompanyRegisterAuthDto.clm_email);
      if(groupOfSystemCompanyByEmail.length){
        return HttpResponseCommon.response409(res, null, 'System Company email is already registed.');   
      }

      const groupOfSystemCompanyByCompanyName = await this.systemCompanyService.fnFindByCompanyName(systemCompanyRegisterAuthDto.clm_company_name);
      if(groupOfSystemCompanyByCompanyName.length){
        return HttpResponseCommon.response409(res, null, 'System Company name is already registed.');   
      }

      const groupOfSystemCompanyByIdentificationNumberAndType = 
        await this.systemCompanyService.fnFindByIdentificationNumberAndType(
          systemCompanyRegisterAuthDto.clm_id_identification_type, 
          systemCompanyRegisterAuthDto.clm_identification_number
          );
      if(groupOfSystemCompanyByIdentificationNumberAndType.length){
        return HttpResponseCommon.response409(res, null, 'System Company identification number is already registed.');   
      }

      const newSystemCompany = await  this.authService.fnSystemCompanyRegister(systemCompanyRegisterAuthDto);
      return HttpResponseCommon.response201(res, newSystemCompany, 'Master User registered Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  @Post('register/system-user')
  async registerSystemUser(@Response() res: Res,@Body() registerSystemUserAuthDto: SystemUserRegisterDto) {
    try {

      const companyById = await this.systemCompanyService.fnFindByCompanyId(registerSystemUserAuthDto.clm_id_system_company);
      if(!companyById){
        return HttpResponseCommon.response404(res, null, 'Company not Found.');   
      }

      const userByEmail = await this.systemUserService.findByEmailAndCompanyId(registerSystemUserAuthDto.clm_email, registerSystemUserAuthDto.clm_id_system_company);
      if(userByEmail.length){
        return HttpResponseCommon.response409(res, null, 'User email is already registed.');   
      }

      const systemUserCreated = await  this.authService.registerSystemUser(registerSystemUserAuthDto);
      const {clm_password, ...tmpSystemUser} = systemUserCreated;

      return HttpResponseCommon.response201(res, tmpSystemUser, 'User registered Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  //REVIEWED
  @Post('login/system-user')
  @HttpCode(HttpStatus.OK)
  async loginSystemUser(@Body() systemUserLogin: AnyUserLoginAuthDto): Promise<TAuthLoginResponse> {
    try {

      const returnSystemUser = await this.systemUserService.fnFindSystemUserByUsernameAndActive(
          systemUserLogin.clm_username, 
          EGeneralActive.ACTIVE
        );
      if(!returnSystemUser) throw new BadRequestException(ESystemMsg.INVALIDUSERPWD);

      const returnsystemCompany = await this.systemCompanyService.fnFindCompanyByIdAndActive(
        returnSystemUser.clm_id_system_company, 
        EGeneralActive.ACTIVE
      );
      if(!returnsystemCompany) throw new BadRequestException(ESystemMsg.INVALIDCOMPANYORDISABLED);
      
      const rtMatches = await this.authService.helperCompareHash(returnSystemUser.clm_password, systemUserLogin.clm_password);
      if(!rtMatches) throw new BadRequestException(ESystemMsg.INVALIDUSERPWD);

      const tokens = await this.authService.fnGetToken(returnSystemUser.clm_id, returnSystemUser.clm_email);
      await this.authService.fnUpdateRefrestTokenHash(returnSystemUser.clm_id, tokens.refresh_token);

      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        systemUser: this.systemUserService.helperConverSystemUserToPublicSystemUser(returnSystemUser),
        systemCompany: returnsystemCompany,
      }
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new InternalServerErrorException(ESystemMsg.SERVERERROR)
    }
    
  }

  //REVIEWED
  @UseGuards(AtGuard)
  @Post('/logout/system-user')
  @HttpCode(HttpStatus.OK)
  localLogout(@GetCurrentUserId()clm_id: number){
    return this.authService.fnLogoutSystemUser(clm_id);
  }

  //REVIEWED
  @UseGuards(AtGuard)
  @Get('/reload/system-user')
  @HttpCode(HttpStatus.OK)
  async reloadSystemUser(@GetCurrentUserId()clm_id: number):Promise<TAuthLoginResponse>{
    try {
      let systemUser = await this.systemUserService.fnFindSystemUserByIdAndActive(clm_id, EGeneralActive.ACTIVE);
      if(!systemUser)throw new BadRequestException(ESystemMsg.NOTFOUNDUSER);

      const returnsystemCompany = await this.systemCompanyService.fnFindCompanyByIdAndActive(
        systemUser.clm_id_system_company, 
        EGeneralActive.ACTIVE
      );
      if(!returnsystemCompany) throw new BadRequestException(ESystemMsg.INVALIDCOMPANYORDISABLED);

      const tokens = await this.authService.fnGetToken(systemUser.clm_id, systemUser.clm_email);
      await this.authService.fnUpdateRefrestTokenHash(systemUser.clm_id, tokens.refresh_token);

      return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        systemUser: this.systemUserService.helperConverSystemUserToPublicSystemUser(systemUser),
        systemCompany: returnsystemCompany,
      }
    } catch (error) {
      if(error instanceof HttpException){
        throw error;
      }
      throw new InternalServerErrorException('Server Error, please contact the System Administrator')
    }
  }

  @UseGuards(RtGuard)
  @Post('/local/refresh')
  @HttpCode(HttpStatus.OK)
  localRefresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ){
    return this.authService.localRefresh(userId, refreshToken);
  }

}
