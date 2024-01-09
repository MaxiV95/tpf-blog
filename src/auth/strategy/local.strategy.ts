//local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    if (email.length===0 || password.length===0) throw new UnauthorizedException('Email and password is required');
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Incorrect email or password');
    const token = this.authService.login(user);
    return token;
  }
}
