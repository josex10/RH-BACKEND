import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminUserMasterService } from './admin_user_master.service';
import { IdParamAdminUserMasterDto } from './dto/id-param-admin_user_master.dto';
import { UpdateAdminUserMasterDto } from './dto/update-admin_user_master.dto';

@Controller('admin-user-master')
export class AdminUserMasterController {
  constructor(private readonly adminUserMasterService: AdminUserMasterService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminUserMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdParamAdminUserMasterDto) {
    return this.adminUserMasterService.findOne(params);
  }

  @Patch('update/:id')
  update(@Param() params: IdParamAdminUserMasterDto, @Body(new ValidationPipe({transform: true})) updateAdminUserMasterDto: UpdateAdminUserMasterDto) {
    return this.adminUserMasterService.update(params, updateAdminUserMasterDto);
  }

  @Patch('activate/:id')
  activate(@Param() params: IdParamAdminUserMasterDto) {
    return this.adminUserMasterService.activate(params);
  }

  @Patch('deactivate/:id')
  deactivate(@Param() params: IdParamAdminUserMasterDto) {
    return this.adminUserMasterService.deactivate(params);
  }
}
