import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminUserMasterModule } from './admin_user_master/admin_user_master.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        database: config.get<string>('DATABASE_DATABASE'),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        host: config.get<string>('DATABASE_HOST'),
        port: parseInt(config.get('DATABASE_PORT')),
        synchronize: false,
        type: 'mysql',
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath:'src/env/development.env',
      isGlobal: true,
    }),
    AdminUserMasterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
