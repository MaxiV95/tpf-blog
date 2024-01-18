//user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @prop {string} id - Identificador único del usuario.
 * @prop {string} email - Correo electrónico del usuario.
 * @prop {string} nickName - Nombre de usuario del usuario.
 */
export interface UserMinDto {
  readonly id: string;
  readonly email: string;
  readonly nickName: string;
}

/**
 * @prop {string} id - Identificador único del usuario.
 * @prop {string} email - Correo electrónico del usuario.
 * @prop {string} nickName - Nombre de usuario del usuario.
 * @prop {boolean} admin - Indica si el usuario es administrador.
 * @prop {number} iat - Tiempo de emisión del token JWT.
 * @prop {number} exp - Tiempo de expiración del token JWT.
 */
export interface UserAuthDto extends UserMinDto {
  admin: boolean;
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
 */
export class UserLoginDto {
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty(passwordProperty)
  readonly password: string;
}

/**
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 * @property {string} nickName - Nombre del usuario.
 * @property {string} img - Enlace de la imagen del usuario (opcional).
 */
export class UserCreateDto extends UserLoginDto {
  @ApiProperty(nickNameProperty)
  readonly nickName: string;
  @ApiPropertyOptional(imgProperty)
  readonly img?: string;
  readonly admin?: boolean;
}

/**
 * @property {string} nickName - Nuevo nombre de usuario (opcional).
 * @property {string} img - Nuevo enlace de la imagen del usuario (opcional).
 * @property {boolean} admin - Nuevo status (solo admins).
 */
export class UserUpdateDto {
  @ApiPropertyOptional(nickNameProperty)
  readonly nickName?: string;
  @ApiPropertyOptional(imgProperty)
  readonly img?: string;
  @ApiPropertyOptional({ description: 'Status.', example: false })
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
