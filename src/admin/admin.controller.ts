// users.controller.ts
import {
  Controller,
  Param,
  Get,
  Delete,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserDB } from 'src/users/user.dto';
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

@ApiTags('Admin')
@Controller('admin')
@UseFilters(ErrorFilter)
@UseGuards(JwtAuthGuard, adminGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Get('users')
  @ApiOperation({ summary: 'ADMIN Obtener todos los usuarios' })
  @ApiResponse({
    status: 201,
    description: 'Retorna todos los usuarios.',
    type: [UserDB],
  })
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // @Get('posts')
  // @ApiOperation({
  //   summary: 'ADMIN Obtener todos los posts con opciones de moderación',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Retorna todos los posts con opciones de moderación.',
  //   type: [PostDB],
  // })
  // getAllPosts() {
  //   return this.adminService.getAllPosts();
  // }
}
