import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminUserMasterService } from './admin_user_master.service';
import { CreateAdminUserMasterDto } from './dto/create-admin_user_master.dto';
import { IdParamAdminUserMasterDto } from './dto/id-param-admin_user_master.dto';
import { UpdateAdminUserMasterDto } from './dto/update-admin_user_master.dto';

@Controller('admin-user-master')
export class AdminUserMasterController {
  constructor(private readonly adminUserMasterService: AdminUserMasterService) {}

  @Post()
  create(@Body() createAdminUserMasterDto: CreateAdminUserMasterDto) {
    return this.adminUserMasterService.create(createAdminUserMasterDto);
  }

  @Get()
  findAll() {
    return this.adminUserMasterService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdParamAdminUserMasterDto) {
    return this.adminUserMasterService.findOne(params);
  }

  @Patch(':id')
  update(@Param() params: IdParamAdminUserMasterDto, @Body() updateAdminUserMasterDto: UpdateAdminUserMasterDto) {
    return this.adminUserMasterService.update(params, updateAdminUserMasterDto);
  }

  @Delete(':id')
  remove(@Param() params: IdParamAdminUserMasterDto) {
    return this.adminUserMasterService.remove(params);
  }
}
