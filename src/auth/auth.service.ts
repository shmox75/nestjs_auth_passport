import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const fakeUsers = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' },
    { id: 3, username: 'user3', password: 'pass3' },
]

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {

    }

    validateUser(authPayloadDto: AuthPayloadDto): any {
        const findUser = fakeUsers.find(user => user.username === authPayloadDto.username && user.password === authPayloadDto.password);
        if(!findUser){
            return null;
        }

        const { password, ...userWithoutPassword } = findUser;

        const token = this.jwtService.sign(userWithoutPassword);
        const refreshToken = this.jwtService.sign(userWithoutPassword, {
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')
        })

        return {
            token,
            refreshToken
        }
    }
}
