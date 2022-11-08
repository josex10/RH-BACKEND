import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterMasterUserAuthDto } from './dto/register-user-master-auth.dto';
import { LoginMasterUserAuthDto } from './dto/login-user-master-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/user-master')
  registerUserMaster(@Body() registerMasterUserAuthDto: RegisterMasterUserAuthDto) {
    return this.authService.registerUserMaster(registerMasterUserAuthDto);
  }

  @Post('login/user-master')
  loginUserMaster(@Body() loginMasterUserAuthDto: LoginMasterUserAuthDto) {
    return this.authService.loginUserMaster(loginMasterUserAuthDto);
  }

}
