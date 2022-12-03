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

//CONTROLERS IMPORTS
import { AppController } from './app.controller';
import { MasterCountryModule } from './modules/master_country/master_country.module';


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
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
