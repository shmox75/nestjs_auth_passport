import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' },
    { id: 3, username: 'user3', password: 'pass3' },
]

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {

    }

    validateUser(authPayloadDto: AuthPayloadDto): any {
        const findUser = fakeUsers.find(user => user.username === authPayloadDto.username && user.password === authPayloadDto.password);
        if(!findUser){
            return null;
        }

        const { password, ...userWithoutPassword } = findUser;

        return this.jwtService.sign(userWithoutPassword);
    }
}
