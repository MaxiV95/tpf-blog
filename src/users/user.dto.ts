export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly name: string;
  readonly email: string;
}

export class LoginUserDto {
  readonly email: string;
  readonly password: string;
}
