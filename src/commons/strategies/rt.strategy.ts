import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt-jwt')
{
    constructor(private readonly config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET_KEY'),
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any){
        const refreshToken = req.get('Authorization').replace('Bearer', '' ).trim();
        return {...payload, refreshToken};
    }
}