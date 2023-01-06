import { Controller, Get, Body, Patch, Param, ValidationPipe, UseGuards, Response } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MasterUserService } from './master_user.service';
import { IdParamMasterUserDto } from './dto/master_user _id_param.dto';
import { UpdateMasterUserDto } from './dto/master_user_update.dto';
import { HttpResponseCommon } from 'src/commons/helpers/http_response.common';
import { Response as Res } from 'express';

@Controller('master_user')
@UseGuards(JwtAuthGuard)
export class MasterUserController {
  constructor(private readonly MasterUserService: MasterUserService) {}

  @Get()
  async findAll(@Response() res: Res, ) {
    try {
      const masterUsers =  await this.MasterUserService.findAll();
      return HttpResponseCommon.response200(res, masterUsers);
    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
  }

  @Get(':id')
  async findById(@Response() res: Res, @Param() params: IdParamMasterUserDto) {
    try {
      const masterUsers =  await this.MasterUserService.findById(params.id);
      if(!masterUsers.length){
        return HttpResponseCommon.response404(res, null, 'Master User Not Found.');      
      }
      return HttpResponseCommon.response200(res, masterUsers,  'Master User Found');
    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
  }

  @Patch('update')
  async update(@Response() res: Res, @Body(new ValidationPipe({transform: true})) updateMasterUserDto: UpdateMasterUserDto) {
    try {

      const userByEmail = await this.MasterUserService.findByEmail(updateMasterUserDto.clm_email);
      if(userByEmail.length){
        return HttpResponseCommon.response409(res, null, 'Master User email is already registed.');   
      }

      const updateResponse = await this.MasterUserService.update(updateMasterUserDto);
      if (updateResponse.affected === 0) {
        return HttpResponseCommon.response404(res, null, 'Master User Not Found.');
      }

      const masterUserById = await this.MasterUserService.findById(updateMasterUserDto.clm_id);
      return HttpResponseCommon.response201(res, masterUserById, 'Master User Updated Successfully');
    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
  }

  @Patch('activate/:id')
  async activate(@Response() res: Res,@Param() params: IdParamMasterUserDto) {
    try {

      const updateResponse = await this.MasterUserService.updateStatusById(params.id, true);
      if (updateResponse.affected === 0) {
        return HttpResponseCommon.response404(res, null, 'Master User Not Found.');
      } 

      const masterUserById = await this.MasterUserService.findById(params.id);
      return HttpResponseCommon.response201(res, masterUserById, 'Master User activated Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }

  @Patch('deactivate/:id')
  async deactivate(@Response() res: Res, @Param() params: IdParamMasterUserDto) {
    try {

      const updateResponse = await this.MasterUserService.updateStatusById(params.id, false);
      if (updateResponse.affected === 0) {
        return HttpResponseCommon.response404(res, null, 'Master User Not Found.');
      } 

      const masterUserById = await this.MasterUserService.findById(params.id);
      return HttpResponseCommon.response201(res, masterUserById, 'Master User deactivated Successfully');

    } catch (error) {
      return HttpResponseCommon.response500(res, error);
    }
    
  }
}
