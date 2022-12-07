import { Controller, Get, Body, Patch, Param, ValidationPipe, UseGuards, Response } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MasterUserService } from './master_user.service';
import { IdParamMasterUserDto } from './dto/master_user _id_param.dto';
import { UpdateMasterUserDto } from './dto/master_user_update.dto';
import { 
  ApiBadRequestResponse, 
  ApiBearerAuth, 
  ApiConflictResponse, 
  ApiInternalServerErrorResponse, 
  ApiNotFoundResponse, 
  ApiOkResponse, 
  ApiTags, 
  ApiUnauthorizedResponse 
} from '@nestjs/swagger';
import { HttpResponseCommon } from 'src/commons/http_response.common';
import { Response as Res } from 'express';

@ApiBearerAuth()
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@ApiInternalServerErrorResponse({description: 'Internal Server Error'})
@ApiBadRequestResponse({description: 'Bad Request'})
@ApiTags('Master User')
@Controller('master_user')
@UseGuards(JwtAuthGuard)
export class MasterUserController {
  constructor(private readonly MasterUserService: MasterUserService) {}

  @ApiOkResponse({description: 'Get all master user data'})
  
  @Get()
  async findAll(@Response() res: Res, ) {
    try {
      const masterUsers =  await this.MasterUserService.findAll();
      HttpResponseCommon.response200(res, masterUsers);
    } catch (error) {
      HttpResponseCommon.response500(res, error);
    }
  }

 
  @ApiOkResponse({description: 'Get single master user data'})
  @ApiNotFoundResponse({description: 'Not Found'})
  @Get(':id')
  async findById(@Response() res: Res, @Param() params: IdParamMasterUserDto) {
    try {
      const masterUsers =  await this.MasterUserService.findById(params.id);
      if(!masterUsers.length){
        HttpResponseCommon.response404(res, null, 'Master User Not Found.');      
      }
      HttpResponseCommon.response200(res, masterUsers,  'Master User Found');
    } catch (error) {
      HttpResponseCommon.response500(res, error);
    }
  }

  @ApiOkResponse({description: 'Updated master user successfully'})
  @ApiConflictResponse({description: 'Conflict'})
  @ApiNotFoundResponse({description: 'Not Found'})
  @Patch('update')
  async update(@Response() res: Res, @Body(new ValidationPipe({transform: true})) updateMasterUserDto: UpdateMasterUserDto) {
    try {

      const userByEmail = await this.MasterUserService.findByEmail(updateMasterUserDto.clm_email);
      if(userByEmail.length){
        HttpResponseCommon.response409(res, null, 'Master User email is already registed.');   
      }

      const updateResponse = await this.MasterUserService.update(updateMasterUserDto);
      if (updateResponse.affected === 0) {
        HttpResponseCommon.response404(res, null, 'Master User Not Found.');
      }

      const masterUserById = await this.MasterUserService.findById(updateMasterUserDto.clm_id);
      HttpResponseCommon.response201(res, masterUserById, 'Master User Updated Successfully');
    } catch (error) {
      HttpResponseCommon.response500(res, error);
    }
  }

  @ApiOkResponse({description: 'Activate master user successfully'})
  @ApiNotFoundResponse({description: 'Not Found'})
  @Patch('activate/:id')
  async activate(@Response() res: Res,@Param() params: IdParamMasterUserDto) {
    try {

      const updateResponse = await this.MasterUserService.updateStatusById(params.id, true);
      if (updateResponse.affected === 0) {
        HttpResponseCommon.response404(res, null, 'Master User Not Found.');
      } 

      const masterUserById = await this.MasterUserService.findById(params.id);
      HttpResponseCommon.response201(res, masterUserById, 'Master User activated Successfully');

    } catch (error) {
      HttpResponseCommon.response500(res, error);
    }
    
  }

  @ApiOkResponse({description: 'Deactivate master user successfully'})
  @ApiNotFoundResponse({description: 'Not Found'})
  @Patch('deactivate/:id')
  async deactivate(@Response() res: Res, @Param() params: IdParamMasterUserDto) {
    try {

      const updateResponse = await this.MasterUserService.updateStatusById(params.id, false);
      if (updateResponse.affected === 0) {
        HttpResponseCommon.response404(res, null, 'Master User Not Found.');
      } 

      const masterUserById = await this.MasterUserService.findById(params.id);
      HttpResponseCommon.response201(res, masterUserById, 'Master User deactivated Successfully');

    } catch (error) {
      HttpResponseCommon.response500(res, error);
    }
    
  }
}
