import { ApiProperty } from '@nestjs/swagger';

export interface UserDto {
  readonly id: string;
  readonly email: string;
  readonly password?: string;
  readonly nickName?: string;
  readonly img?: string;
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

export class UserCreateDto {
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty(passwordProperty)
  readonly password: string;
  @ApiProperty(nickNameProperty)
  readonly nickName: string;
  @ApiProperty(imgProperty)
  readonly img: string;
}

export class UserLoginDto {
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty(passwordProperty)
  readonly password: string;
}

export class UserUpdateDto {
  @ApiProperty(nickNameProperty)
  readonly nickName: string;
  @ApiProperty(imgProperty)
  readonly img: string;
}

export class UserDB {
  @ApiProperty(idProperty)
  readonly _id: string;
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty(nickNameProperty)
  readonly nickName: string;
  @ApiProperty(imgProperty)
  readonly img: string;
}

export class UserJWT {
  @ApiProperty(idProperty)
  readonly id: string;
  @ApiProperty(emailProperty)
  readonly email: string;
  @ApiProperty({ description: 'Tiempo de Emisión.', example: '123123' })
  readonly iat: any;
  @ApiProperty({ description: 'Tiempo de Expiración.', example: '123123' })
  readonly exp: any;
}
