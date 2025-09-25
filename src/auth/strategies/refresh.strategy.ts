import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken),
            ignoreExpiration: false,
            secretOrKey: 'abc123'
        });
    }

    validate( payload: any ) {
        console.log('inside JwtStrategy');
        console.log(payload);

        return payload;
    }
}