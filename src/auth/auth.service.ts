//auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserAuthDto } from 'src/users/user.dto';
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
   * @param email - El correo electrónico del usuario.
   * @param password - La contraseña del usuario.
   * @returns Un objeto UserAuthDto si las credenciales son válidas, o null si no lo son.
   */
  async validateUser(email: string, password: string): Promise<UserAuthDto> {
    const user = await this.userModel.findOne({ email: email }).lean();
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    return {
      id: user._id.toString(),
      email: user.email,
      nickName: user.nickName,
      admin: user.admin,
    };
  }

  /**
   * Genera un token de acceso para un usuario autenticado.
   * @param user - Un objeto UserAuthDto que representa al usuario autenticado.
   * @returns Un objeto con un token de acceso.
   */
  login(user: UserAuthDto) {
    const payload: UserAuthDto = {
      id: user.id,
      email: user.email,
      nickName: user.nickName,
      admin: user.admin,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
