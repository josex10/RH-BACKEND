// NEST IMPORTS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// CONFIG IMPORTS
import { TypeOrmConfig } from './config/typeOrm.config';

// SERVICE IMPORTS
import { AppService } from './app.service';

// MODULES IMPORTS
import { AdminUserMasterModule } from './modules/admin_user_master/admin_user_master.module';
import { AuthModule } from './modules/auth/auth.module';

//CONTROLERS IMPORTS
import { AppController } from './app.controller';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    ConfigModule.forRoot({
      envFilePath:'src/env/development.env',
      isGlobal: true,
    }),
    AdminUserMasterModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
