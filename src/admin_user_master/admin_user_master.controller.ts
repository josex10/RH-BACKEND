import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminUserMasterService } from './admin_user_master.service';
import { CreateAdminUserMasterDto } from './dto/create-admin_user_master.dto';
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
  findOne(@Param('id') id: string) {
    return this.adminUserMasterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminUserMasterDto: UpdateAdminUserMasterDto) {
    return this.adminUserMasterService.update(+id, updateAdminUserMasterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUserMasterService.remove(+id);
  }
}
