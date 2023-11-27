export interface User {
  id: number;
  email: string;
  name?: string;
  password?: string;
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
}

export class LoginUserDto {
  readonly email: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly id: number;
  readonly name: string;
}
