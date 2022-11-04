import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmOptionsFactory,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {

    constructor(
        private readonly config: ConfigService
    ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            database: this.config.get<string>('DATABASE_DATABASE'),
            username: this.config.get<string>('DATABASE_USERNAME'),
            password: this.config.get<string>('DATABASE_PASSWORD'),
            host: this.config.get<string>('DATABASE_HOST'),
            port: parseInt(this.config.get('DATABASE_PORT')),
            synchronize: false,
            type: 'mysql',
            entities: [__dirname + '/../**/*.entity.{ts,js}']
        };
    }
}