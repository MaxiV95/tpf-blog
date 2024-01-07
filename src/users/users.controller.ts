// users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  UserCreateDto,
  UserLoginDto,
  UserUpdateDto,
  UserDB,
  UserJWT,
} from './user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/strategy/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { ErrorFilter } from 'src/errorExceptionFilters';
import { User } from 'src/decorators/custom.decorator.ts';

@ApiTags('Users')
@Controller('users')
@UseFilters(ErrorFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id') // login
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del usuario.',
    type: UserDB,
  })
  @UseGuards(JwtAuthGuard)
  getUser(@Param('id') id: string, @User() user: UserJWT) {
    if (!user.admin && id !== user.id)
      throw new UnauthorizedException('Unauthorized admin access');
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
    return this.usersService.registerUser(createUser);
  }

  @Post('login')
  @ApiOperation({ summary: 'Obtener token JWT' })
  @ApiResponse({
    status: 201,
    description: 'Retorna JWT para siguientes consultas.',
  })
  @ApiResponse({
    status: 401,
    description: 'email o password incorrecto.',
  })
  @UseGuards(LocalAuthGuard)
  login(@Body() loginUser: UserLoginDto, @User() user: any) {
    return { access_token: user.access_token };
  }
}
