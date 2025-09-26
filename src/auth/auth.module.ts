import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';
import jwtConfig from './config/jwt.config'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
          secret: 'abc123',
          signOptions: { expiresIn: '1h' },
    }),   
    ConfigModule.forFeature(jwtConfig),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    RefreshJwtStrategy
  ]
})
export class AuthModule {}
