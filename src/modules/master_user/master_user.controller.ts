import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MasterUserService } from './master_user.service';
import { IdParamMasterUserDto } from './dto/master_user _id_param.dto';
import { UpdateMasterUserDto } from './dto/master_user_update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Master User')
@Controller('master_user')
export class MasterUserController {
  constructor(private readonly MasterUserService: MasterUserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.MasterUserService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params: IdParamMasterUserDto) {
    return this.MasterUserService.findOne(params);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param() params: IdParamMasterUserDto, @Body(new ValidationPipe({transform: true})) updateMasterUserDto: UpdateMasterUserDto) {
    return this.MasterUserService.update(params, updateMasterUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('activate/:id')
  activate(@Param() params: IdParamMasterUserDto) {
    return this.MasterUserService.activate(params);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('deactivate/:id')
  deactivate(@Param() params: IdParamMasterUserDto) {
    return this.MasterUserService.deactivate(params);
  }
}
