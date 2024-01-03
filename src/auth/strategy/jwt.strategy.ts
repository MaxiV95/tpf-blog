import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJWT, UserDto } from 'src/users/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '$P4L4bR45Up3RS3CR3T4%', //dotenv
    });
  }

  validate(payload: UserJWT): UserDto{
    if (!payload) throw new UnauthorizedException();
    return { id: payload.id, email: payload.email };
  }
}
