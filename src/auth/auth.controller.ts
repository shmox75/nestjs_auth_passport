import { Body, Controller, Post, UnauthorizedException, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { type Request } from 'express'
import { JwtGuard } from './guards/jwt.guard';
import { type Response } from 'express';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const user: any =  req.user;

        res.cookie('jwt', user?.refreshToken, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: false,   // Ensures the cookie is only sent over HTTPS
            sameSite: 'none', // Controls how cookies are sent with cross-site requests
            maxAge: 3600000 * 24 * 10, // Cookie expiration time in milliseconds (e.g., 1 hour)
        });

        return user
    }

    @Get('status')
    @UseGuards(JwtGuard)
    status(@Req() req: Request) {
        return req.user
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    refresh(@Req() req) {
        return this.authService.refreshToken(req.user.id);
    }

}
