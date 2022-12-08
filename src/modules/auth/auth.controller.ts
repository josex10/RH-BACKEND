import { Controller, Post, Body, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MasterUserRegisterAuthDto } from './dto/master_user_register_auth.dto';
import { MasterUserLoginAuthDto } from './dto/master_user_login_auth.dto';
import { Response as Res } from 'express';
import { HttpResponseCommon } from 'src/commons/http_response.common';
import { MasterUserService } from '../master_user/master_user.service';
import { SystemCompanyService } from '../system_company/system_company.service';
import { SystemCompanyRegisterAuthDto } from './dto/system_company_register_auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,  
    private readonly masterUserService: MasterUserService, 
    private readonly systemCompanyService: SystemCompanyService) {}

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
  async loginUserMaster(@Response() res: Res,@Body() incomingMasterUser: MasterUserLoginAuthDto) {
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

}
