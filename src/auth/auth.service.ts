import { Injectable } from '@nestjs/common';
import { User } from 'src/users/interfaces/user';

@Injectable()
export class AuthService {
  testUser: User;

  constructor() {
    this.testUser = {
      id: 1,
      name: 'Maxi',
      password: 'test',
    };
  }

  // ACA TRAEMOS AL USUARIO DE MONGO
  
  async validateUser(username: string, password: string): Promise<any> {
    console.log('AuthService');
    if (
      this.testUser?.name == username &&
      this.testUser?.password === password
    ) {
      return { id: this.testUser.id, name: this.testUser.name };
    }
    return null;
  }
}
