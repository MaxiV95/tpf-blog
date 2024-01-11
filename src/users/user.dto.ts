//user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

/**
 * @prop {string} id - Identificador único del usuario.
 * @prop {string} email - Correo electrónico del usuario.
 * @prop {string} nickName - Nombre de usuario del usuario.
 * @prop {boolean} admin - Indica si el usuario es administrador.
 */
export interface UserAuthDto {
  readonly id: string;
  readonly email: string;
  readonly nickName: string;
  admin?: boolean;
}

/**
 * @prop {number} iat - Tiempo de emisión del token JWT.
 * @prop {number} exp - Tiempo de expiración del token JWT.
 * @prop {string} id - Identificador único del usuario.
 * @prop {string} email - Correo electrónico del usuario.
 * @prop {string} nickName - Nombre de usuario del usuario.
 * @prop {boolean} admin - Indica si el usuario es administrador.
 */
export interface UserJWT extends UserAuthDto {
  readonly iat: number;
  readonly exp: number;
}

const idProperty: Record<string, string> = {
  description: 'ID del usuario.',
  example: '6570bb7db2ad523394706c12',
};
const emailProperty: Record<string, string> = {
  description: 'email del usuario.',
  example: 'maxi@gmail.com',
};
const passwordProperty: Record<string, string> = {
  description: 'Contraseña del usuario.',
  example: 'C0ntr4s3ñ4!',
};
const nickNameProperty: Record<string, string> = {
  description: 'Nombre del usuario.',
  example: 'MaxiV95',
};
const imgProperty: Record<string, string> = {
  description: 'Link de imagen del usuario.',
  example: 'https://avatars.githubusercontent.com/u/118027004',
};

/**
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 * @property {string} nickName - Nombre del usuario.
 * @property {string} img - Enlace de la imagen del usuario (opcional).
 */
export class UserCreateDto {
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty(passwordProperty)
  readonly password: string;
  @ApiProperty(nickNameProperty)
  readonly nickName: string;
  @ApiProperty(imgProperty)
  readonly img?: string;
}

/**
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 */
export class UserLoginDto {
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty(passwordProperty)
  readonly password: string;
}

/**
 * @property {string} nickName - Nuevo nombre de usuario (opcional).
 * @property {string} img - Nuevo enlace de la imagen del usuario (opcional).
 * @property {boolean} admin - Nuevo status (solo admins).
 */
export class UserUpdateDto {
  @ApiProperty(nickNameProperty)
  readonly nickName?: string;
  @ApiProperty(imgProperty)
  readonly img?: string;
  @ApiProperty(imgProperty)
  readonly admin?: boolean;
}

/**
 * @property {string} id - Identificador único del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} nickName - Nombre del usuario.
 * @property {boolean} admin - Indica si el usuario es administrador.
 * @property {string} img - Enlace de la imagen del usuario.
 */
export class UserDB {
  @ApiProperty(idProperty)
  readonly id: string;
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty(nickNameProperty)
  readonly nickName: string;
  @ApiProperty({ description: 'Status.', example: false })
  readonly admin: boolean;
  @ApiProperty(imgProperty)
  readonly img: string;
}
