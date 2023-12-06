import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  testUser: User;

  constructor(private jwtService: JwtService) {
    this.testUser = {
      id: 1,
      email: 'maxi@gmail.com',
      password: 'test',
    };
  }

  // ACA TRAEMOS AL USUARIO DE MONGO

  async validateUser(email: string, password: string): Promise<User> {
    if (this.testUser?.email == email && this.testUser?.password === password) {
      return {
        id: this.testUser.id,
        email: this.testUser.email,
      };
    }
    return null;
  }

  login(user: User) {
    const payload: User = {
      id: user.id,
      email: user.email,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
