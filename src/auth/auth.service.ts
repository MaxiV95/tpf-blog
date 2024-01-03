import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  testUser: UserDto;

  constructor(private jwtService: JwtService) {
    this.testUser = {
      id: '1a',
      email: 'maxi@gmail.com',
      password: 'test',
    };
  }

  // ACA TRAEMOS AL USUARIO DE MONGO

  async validateUser(email: string, password: string): Promise<UserDto> {
    if (this.testUser?.email == email && this.testUser?.password === password) {
      return {
        id: this.testUser.id,
        email: this.testUser.email,
      };
    }
    return null;
  }

  login(user: UserDto) {
    const payload: UserDto = {
      id: user.id,
      email: user.email,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
