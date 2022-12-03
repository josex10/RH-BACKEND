import { Module } from '@nestjs/common';
import { MasterUserService } from './master_user.service';
import { MasterUserController } from './master_user.controller';
import { MasterUserEntity } from './entities/master_user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MasterUserEntity])],
  controllers: [MasterUserController],
  providers: [MasterUserService],
  exports: [MasterUserService]
})
export class MasterUserModule {}
