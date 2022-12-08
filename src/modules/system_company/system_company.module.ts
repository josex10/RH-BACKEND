import { Module } from '@nestjs/common';
import { SystemCompanyService } from './system_company.service';
import { SystemCompanyController } from './system_company.controller';
import { SystemCompanyEntity } from './entities/system_company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SystemCompanyEntity])],
  controllers: [SystemCompanyController],
  providers: [SystemCompanyService],
  exports: [SystemCompanyService]
})
export class SystemCompanyModule {}