import { Controller, Get, Body, Patch, Param, ValidationPipe, UseGuards, Response } from '@nestjs/common';
import { HttpResponseCommon } from 'src/commons/helpers/http_response.common';
import { Response as Res } from 'express';
import { SystemUserService } from './system_user.service';
import { SystemUserIdDto } from './dto/system_user_id.dto';
import { UpdateSystemUserDto } from './dto/system_user_update.dto';

@Controller('system_user')
export class SystemUserController {
  constructor(private readonly systemUserService: SystemUserService) {}

  @Get()
  async findAll(@Response() res: Res, ) {
    try {
      const systemUsers =  await this.systemUserService.findAll();
      return HttpResponseCommon.response200(res, systemUsers);
    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
  }

  @Get(':id')
  async findById(@Response() res: Res, @Param() params: SystemUserIdDto) {
    try {
      const systemUsers =  await this.systemUserService.findById(params.id);
      if(!systemUsers.length){
        return HttpResponseCommon.response404(res, null, 'System User Not Found.');      
      }
      return HttpResponseCommon.response200(res, systemUsers,  'Master User Found');
    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
  }

  @Patch('update')
  async update(@Response() res: Res, @Body(new ValidationPipe({transform: true})) updateSystemUserDto: UpdateSystemUserDto) {
    try {

      const userByEmail = await this.systemUserService.findByEmail(updateSystemUserDto.clm_email);
      if(userByEmail.length){
        return HttpResponseCommon.response409(res, null, 'System User email is already registed.');   
      }

      const updateResponse = await this.systemUserService.update(updateSystemUserDto);
      if (updateResponse.affected === 0) {
        return HttpResponseCommon.response404(res, null, 'Master User Not Found.');
      }

      const systemUserById = await this.systemUserService.findById(updateSystemUserDto.clm_id);
      return HttpResponseCommon.response201(res, updateSystemUserDto, 'System User Updated Successfully');
    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
  }

  @Patch('activate/:id')
  async activate(@Response() res: Res,@Param() params: SystemUserIdDto) {
    try {

      const updateResponse = await this.systemUserService.updateStatusById(params.id, true);
      if (updateResponse.affected === 0) {
        return HttpResponseCommon.response404(res, null, 'System User Not Found.');
      } 

      const systemUserById = await this.systemUserService.findById(params.id);
      return HttpResponseCommon.response201(res, systemUserById, 'System User activated Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  @Patch('deactivate/:id')
  async deactivate(@Response() res: Res, @Param() params: SystemUserIdDto) {
    try {

      const updateResponse = await this.systemUserService.updateStatusById(params.id, false);
      if (updateResponse.affected === 0) {
        return HttpResponseCommon.response404(res, null, 'System User Not Found.');
      } 

      const systemUserById = await this.systemUserService.findById(params.id);
      return HttpResponseCommon.response201(res, systemUserById, 'System User deactivated Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  @Patch('offFirstLogin/:id')
  async offFirstLoging(@Response() res: Res, @Param() params: SystemUserIdDto) {
    try {

      const updateResponse = await this.systemUserService.removeFirstLoginOfTheSystemUserById(params.id);
      if (updateResponse.affected === 0) {
        return HttpResponseCommon.response404(res, null, 'System User Not Found.');
      } 

      const systemUserById = await this.systemUserService.findById(params.id);
      return HttpResponseCommon.response201(res, systemUserById, 'System User off first login Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }
}
