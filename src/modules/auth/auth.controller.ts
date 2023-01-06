import { Controller, Post, Body, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MasterUserRegisterAuthDto } from './dto/master_user_register_auth.dto';
import { AnyUserLoginAuthDto } from './dto/any_user_login_auth.dto';
import { Response as Res } from 'express';
import { HttpResponseCommon } from 'src/commons/helpers/http_response.common';
import { LanguageHandlerCommon } from 'src/commons/helpers/language-handler.common';
import { MasterUserService } from '../master_user/master_user.service';
import { SystemCompanyService } from '../system_company/system_company.service';
import { SystemCompanyRegisterAuthDto } from './dto/system_company_register_auth.dto';
import { SystemUserService } from '../system_user/system_user.service';
import { SystemUserRegisterDto } from './dto/system_user_register_auth.dto';
import { Headers } from '@nestjs/common';

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
      if(!companyById.length){
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

  @Post('login/system-user')
  async loginSystemUser(@Response() res: Res,@Headers() headers, @Body() incomingSystemUser: AnyUserLoginAuthDto) {
    try {

      const languageMessageHandler = new LanguageHandlerCommon();
      

      console.log(headers['language']);
      const storedSystemUser = await this.systemUserService.findByUsernameForLogin(incomingSystemUser.clm_username);
      if(!storedSystemUser){
        return HttpResponseCommon.response409(res, null, languageMessageHandler.fnlanguageHandlerMessage(headers, 'WRONG_USERNAME_PASSWORD'));  
      }

      if(!storedSystemUser.clm_is_active){
        return HttpResponseCommon.response401(res, null, 'User account is disable.');   
      }

      const comparePwd = await this.authService.fnComparePassword(incomingSystemUser.clm_password, storedSystemUser.clm_password);
      if(!comparePwd){
        return HttpResponseCommon.response409(res, null, 'The user username/password is wrong.'); 
      }

      const token = this.authService.fnCreateTokerForSystemUser(storedSystemUser);
      const {clm_password, ...tmpSystemUser} = storedSystemUser;

      const response = {
        systemUser: tmpSystemUser, 
        token
      }
      return HttpResponseCommon.response200(res, response, 'User Login Successfully'); 

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  

}
