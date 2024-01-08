// users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto, UserLoginDto, UserUpdateDto, UserDB } from './user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/strategy/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { LimitedUserGuard } from 'src/decorators/limitedUser.guard';
import { adminGuard } from 'src/decorators/admin.guard';
import { ErrorFilter } from 'src/errorExceptionFilters';
import { User } from 'src/decorators/custom.decorator.ts';

@ApiTags('Users')
@Controller('users')
@UseFilters(ErrorFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id') // user o admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del usuario.',
    type: UserDB,
  })
  @UseGuards(JwtAuthGuard, LimitedUserGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Put(':id') // user o admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modificar usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del usuario.',
    type: UserDB,
  })
  @UseGuards(JwtAuthGuard, LimitedUserGuard)
  updateUser(@Param('id') id: string, @Body() updateUser: UserUpdateDto) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id') // admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN Eliminar usuario' })
  @ApiResponse({
    status: 200,
    description: 'Confirma usuario eliminado.',
    schema: {
      properties: {
        acknowledged: { type: 'boolean' },
        deletedCount: { type: 'number' },
      },
      example: {
        acknowledged: true,
        deletedCount: 1,
      },
    },
  })
  @UseGuards(JwtAuthGuard, adminGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
  @Get() // admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN Obtener todos los usuarios' })
  @ApiResponse({
    status: 201,
    description: 'Retorna los datos del usuario creado.',
    type: [UserDB],
  })
  @UseGuards(JwtAuthGuard, adminGuard)
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
