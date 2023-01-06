import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUserEntity } from './entities/system_user.entity';
import { SystemUserController } from './system_user.controller';
import { SystemUserService } from './system_user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUserEntity])],
  controllers: [SystemUserController],
  providers: [SystemUserService],
  exports: [SystemUserService]
})
export class SystemUserModule {}