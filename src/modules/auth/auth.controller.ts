import { Controller, Post, Body, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterMasterUserAuthDto } from './dto/register-user-master-auth.dto';
import { LoginMasterUserAuthDto } from './dto/login-user-master-auth.dto';
import { 
  ApiConflictResponse,
  ApiCreatedResponse, 
  ApiInternalServerErrorResponse, 
  ApiNotFoundResponse, 
  ApiTags, 
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Response as Res } from 'express';
import { HttpResponseCommon } from 'src/commons/http_response.common';
import { MasterUserService } from '../master_user/master_user.service';

@ApiTags('Authentication')
@ApiConflictResponse({description: 'Conflict'})
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@ApiInternalServerErrorResponse({description: 'Internal Server Error'})
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,  private readonly masterUserService: MasterUserService) {}

  @ApiCreatedResponse({description: 'Create master user successfully'})
  @Post('register/user-master')
  async registerUserMaster(@Response() res: Res,@Body() registerMasterUserAuthDto: RegisterMasterUserAuthDto) {
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
  @ApiCreatedResponse({description: 'Login successfull'})
  @ApiNotFoundResponse({description: 'Not Found'})
  async loginUserMaster(@Response() res: Res,@Body() incomingMasterUser: LoginMasterUserAuthDto) {
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

}
