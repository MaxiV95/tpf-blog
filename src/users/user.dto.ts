export interface User {
  id: number;
  email: string;
  password?: string;
  nickName?: string;
  img?: string;
}

export interface JwtUser {
  exp: any;
  iat: any;
  id: number;
  email: string;
}

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly nickName: string;
  readonly img: string;
}

export class LoginUserDto {
  readonly email: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly id: number;
  readonly email: string;
  readonly nickName: string;
  readonly img: string;
}
