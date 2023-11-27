import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users = []; // Debes conectar con tu base de datos MongoDB

  async register(createUserDto: CreateUserDto) {
    // Verifica si el usuario ya existe
    const existingUser = this.users.find(
      (user) => user.email === createUserDto.email,
    );
    if (existingUser) throw new Error('El usuario ya existe');

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crea un nuevo usuario con la contraseña hasheada
    const newUser = {
      id: Date.now().toString(),
      ...createUserDto,
      password: hashedPassword, // Almacena la contraseña hasheada
    };

    // Agrega el nuevo usuario a la lista de usuarios
    this.users.push(newUser);

    // Retorna el nuevo usuario
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
