import { Module } from '@nestjs/common';
import { AdminUserMasterService } from './admin_user_master.service';
import { AdminUserMasterController } from './admin_user_master.controller';
import { AdminUserMaster } from './entities/admin_user_master.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserMaster])],
  controllers: [AdminUserMasterController],
  providers: [AdminUserMasterService],
  exports: [AdminUserMasterService]
})
export class AdminUserMasterModule {}
