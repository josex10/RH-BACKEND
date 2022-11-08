import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor( private readonly config: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: config.get<string>('JWT_SECRET_KEY'),
        });
    }
    
    async validate(payload: any) {
        return { clm_id: payload.clm_id, clm_username: payload.clm_username };
    }
}
