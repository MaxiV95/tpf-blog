// admin.controller.ts
import {
  Controller,
  Param,
  Get,
  Delete,
  UseFilters,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UserAuthDto, UserDB } from 'src/users/user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { ErrorFilter } from 'src/errorExceptionFilters';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { adminGuard } from 'src/auth/guard/admin.guard';
import { User } from 'src/auth/custom.decorator.ts';
import { ReducedPostDB } from 'src/posts/post.dto';

@ApiTags('Administration')
@Controller('admin')
@UseFilters(ErrorFilter)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({ summary: 'ADMIN Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los usuarios.',
    type: [UserDB],
  })
  @UseGuards(JwtAuthGuard, adminGuard)
  @HttpCode(200)
  async getAllUsers(): Promise<UserDB[]> {
    return await this.adminService.getAllUsers();
  }

  @Delete('users/:id')
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
  async deleteUser(@Param('id') id: string) {
    return await this.adminService.deleteUser(id);
  }

  @Get('posts')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Obtener todos los posts con opciones de moderación (borrar o editar)',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos los posts con opciones de moderación.',
    type: [ReducedPostDB],
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getAllPosts(@User() user: UserAuthDto): Promise<ReducedPostDB[]> {
    return await this.adminService.getAllPosts(user);
  }
}
