// NEST IMPORTS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// CONFIG IMPORTS
import { TypeOrmConfig } from './config/typeOrm.config';

// SERVICE IMPORTS
import { AppService } from './app.service';

// MODULES IMPORTS
import { MasterUserModule } from './modules/master_user/master_user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MasterCountryModule } from './modules/master_country/master_country.module';
import { SystemCompanyModule } from './modules/system_company/system_company.module';

//CONTROLERS IMPORTS
import { AppController } from './app.controller';
import { MasterStateModule } from './modules/master_state/master_state.module';
import { MasterCantonModule } from './modules/master_canton/master_canton.module';
import { MasterDistrictModule } from './modules/master_district/master_district.module';
import { MasterIdentificationTypeModule } from './modules/master_identification_type/master_identification_type.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    ConfigModule.forRoot({
      envFilePath:'src/env/development.env',
      isGlobal: true,
    }),
    MasterUserModule,
    MasterCountryModule,
    AuthModule, 
    SystemCompanyModule, 
    MasterStateModule,
    MasterCantonModule, 
    MasterDistrictModule,
    MasterIdentificationTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
