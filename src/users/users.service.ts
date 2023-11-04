import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users = []; // Debes conectar con tu base de datos MongoDB

  register(createUserDto: CreateUserDto) {
    // Aquí puedes realizar validaciones, como verificar si el usuario ya existe
    const newUser = {
      id: Date.now().toString(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  login(loginUserDto: LoginUserDto) {
    const user = this.users.find(
      (u) =>
        u.email === loginUserDto.email && u.password === loginUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  listUsers() {
    return this.users;
  }

  getUser(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = this.getUser(id);
    // Aquí puedes implementar la lógica de actualización
    Object.assign(user, updateUserDto);
    return user;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(index, 1);
  }
}
