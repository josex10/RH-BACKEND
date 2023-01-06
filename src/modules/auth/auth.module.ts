import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterUserEntity } from '../master_user/entities/master_user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MasterUserModule } from '../master_user/master_user.module';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendgridService } from 'src/commons/sendgrid.common';
import { SystemCompanyEntity } from '../system_company/entities/system_company.entity';
import { SystemCompanyService } from '../system_company/system_company.service';
import { SystemUserEntity } from '../system_user/entities/system_user.entity';
import { SystemUserService } from '../system_user/system_user.service';

@Module({
  imports: [
    MasterUserModule,
    TypeOrmModule.forFeature([MasterUserEntity, SystemCompanyEntity, SystemUserEntity]),
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
  providers: [AuthService, JwtStrategy, SendgridService, SystemCompanyService, SystemUserService]
})
export class AuthModule {}
