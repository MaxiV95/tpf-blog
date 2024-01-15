// users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDto, UserLoginDto, UserUpdateDto, UserDB } from './user.dto';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/strategy/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { LimitedUserGuard } from 'src/auth/guard/limitedUser.guard';
import { adminGuard } from 'src/auth/guard/admin.guard';
import { ErrorFilter } from 'src/errorExceptionFilters';
import { User } from 'src/auth/custom.decorator.ts';

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
  @HttpCode(200)
  async getUserById(@Param('id') id: string): Promise<UserDB> {
    return await this.usersService.getUser(id);
  }

  @Put(':id') // user o admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modificar usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del usuario modificado.',
    type: UserDB,
  })
  @UseGuards(JwtAuthGuard, LimitedUserGuard)
  @HttpCode(200)
  async updateUser(@Param('id') id: string, @Body() updateUser: UserUpdateDto): Promise<UserDB> {
    return await this.usersService.updateUser(id, updateUser);
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
  @HttpCode(200)
  async deleteUser(@Param('id') id: string): Promise<UserDB> {
    return await this.usersService.deleteUser(id);
  }

  @Get() // admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ADMIN Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los usuarios.',
    type: [UserDB],
  })
  @UseGuards(JwtAuthGuard, adminGuard)
  @HttpCode(200)
  async getAllUsers(): Promise<UserDB[]> {
    return await this.usersService.getAllUsers();
  }

  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({
    status: 201,
    description: 'Retorna los datos del usuario creado.',
    type: UserDB,
  })
  @HttpCode(201)
  async register(@Body() createUser: UserCreateDto): Promise<UserDB> {
    return await this.usersService.registerUser(createUser);
  }

  @Post('login')
  @ApiOperation({ summary: 'Obtener token de JWT' })
  @ApiResponse({
    status: 200,
    description: 'Retorna JWT para siguientes consultas.',
    schema: {
      properties: {
        access_token: { type: 'string' },
      },
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXCVI9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'email o password incorrecto.',
  })
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Body() loginUser: UserLoginDto, @User() user: any): Promise<any> {
    return { access_token: user.access_token };
  }
}

