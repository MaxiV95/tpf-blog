//auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserMinDto } from 'src/users/user.dto';
import { User } from 'src/users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Valida las credenciales de un usuario.
   * @param {string} email - El correo electrónico del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns Un objeto UserAuthDto si las credenciales son válidas, o null si no lo son.
   */
  async validateUser(email: string, password: string): Promise<UserMinDto> {
    const user = await this.userModel.findOne({ email: email }).lean();
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    return {
      id: user._id.toString(),
      email: user.email,
      nickName: user.nickName,
    };
  }

  /**
   * Genera un token de acceso para un usuario autenticado.
   * @param {UserAuthDto} user - El usuario autenticado.
   * @returns Un objeto con un token de acceso.
   */
  login(user: UserMinDto) {
    const payload: UserMinDto = {
      id: user.id,
      email: user.email,
      nickName: user.nickName,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  /**
   * Comprueba si un usuario tiene privilegios de administrador.
   * @param {string} id - El ID del usuario a verificar.
   * @returns Un booleano indicando si el usuario es un administrador.
   */
  async isAdmin(id: string): Promise<boolean> {
    const user = await this.userModel.findById({ _id: id }).lean();
    return user.admin;
  }
}
