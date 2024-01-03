// users.controller.ts
import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseFilters,
} from '@nestjs/common';
import {
  UserJWT,
  UserCreateDto,
  UserLoginDto,
  UserUpdateDto,
  UserDB,
} from './user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ErrorFilter } from 'src/errorExceptionFilters';

@ApiTags('Users')
@Controller('users')
@UseFilters(ErrorFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id') // login
  @ApiOperation({ summary: 'Obtener usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del usuario.',
    type: UserDB,
  })
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Put(':id') // login o admin
  @ApiOperation({ summary: 'Modificar usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del usuario.',
    type: UserDB,
  })
  updateUser(@Param('id') id: string, @Body() updateUser: UserUpdateDto) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id') // admin
  @ApiOperation({ summary: 'ADMIN Eliminar usuario' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get() // admin
  @ApiOperation({ summary: 'ADMIN Obtener todos los usuarios' })
  @ApiResponse({
    status: 201,
    description: 'Retorna los datos del usuario creado.',
    type: [UserDB],
  })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({
    status: 201,
    description: 'Retorna los datos del usuario creado.',
    type: UserDB,
  })
  register(@Body() createUser: UserCreateDto) {
    return this.usersService.register(createUser);
  }

  @Post('login') // auth
  @ApiOperation({ summary: 'Obtener token JWT' })
  @ApiResponse({
    status: 201,
    description: 'Retorna JWT para siguientes consultas.',
    type: UserJWT,
  })
  @ApiResponse({
    status: 401,
    description: 'email o password incorrecto.',
  })
  login(@Body() loginUser: UserLoginDto) {
    return this.usersService.login(loginUser);
  }
}
