import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import jwtConstants from 'src/constants/jwtConstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        console.log(ExtractJwt.fromAuthHeaderAsBearerToken());

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
