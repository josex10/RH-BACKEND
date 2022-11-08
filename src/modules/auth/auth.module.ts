import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserMaster } from '../admin_user_master/entities/admin_user_master.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminUserMasterModule } from '../admin_user_master/admin_user_master.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AdminUserMasterModule,
    TypeOrmModule.forFeature([AdminUserMaster]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: configService.get<string>('JWT_SECRET_OPTIONS_EXPIRESIN')},
        };
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
