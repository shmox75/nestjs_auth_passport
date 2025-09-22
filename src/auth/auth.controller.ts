import { Body, Controller, Post, UnauthorizedException, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { type Request } from 'express'
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request, @Body() authPayload: AuthPayloadDto) {
        
        const user = this.authService.validateUser(authPayload);

        return user;
    }

    @Get('status')
    @UseGuards(JwtGuard)
    status(@Req() req: Request) {
        console.log(req.user);
    }
}
