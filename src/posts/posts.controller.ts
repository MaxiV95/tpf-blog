// posts.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { PostDB, PostDto } from './post.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { User } from 'src/auth/custom.decorator.ts';
import { UserAuthDto } from 'src/users/user.dto';
import { ErrorFilter } from 'src/errorExceptionFilters';

@ApiTags('Posts')
@Controller('posts')
@UseFilters(ErrorFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id') // user o admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener posteo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: PostDB,
  })
  @UseGuards(JwtAuthGuard)
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Put(':id') // user o admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modificar posteo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo modificado.',
    type: PostDB,
  })
  @UseGuards(JwtAuthGuard)
  updatePost(
    @Param('id') id: string,
    @Body() updatePost: PostDto,
    @User() user: UserAuthDto,
  ) {
    return this.postsService.updatePost(id, updatePost, user);
  }

  @Delete(':id') // user o admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar posteo' })
  @ApiResponse({
    status: 200,
    description: 'Confirma posteo eliminado.',
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
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string, @User() user: UserAuthDto) {
    return this.postsService.deletePost(id, user);
  }

  /**
   * Obtiene una lista paginada de posts.
   * @param page Número de página deseado (por defecto es 1).
   * @param limit Cantidad máxima de resultados por página (por defecto es 10).
   * @returns Una lista paginada de posts.
   */
  // /api/posts?page=2&limit=15
  @Get() // param paginado, default 10
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los posteos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los posteos.',
    type: [PostDB],
  })
  @UseGuards(JwtAuthGuard)
  async listPosts(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.postsService.getAllPost(page, limit);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear posteo' })
  @ApiResponse({
    status: 201,
    description: 'Retorna los datos del posteo.',
    type: PostDB,
  })
  @UseGuards(JwtAuthGuard)
  createPost(@Body() dataPost: PostDto, @User() user: UserAuthDto) {
    return this.postsService.createPost(dataPost, user);
  }

  @Get('user/:idUser')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los posteos de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los posteos.',
    type: [PostDB],
  })
  @UseGuards(JwtAuthGuard)
  getPostUser(@Param('idUser') idUser: string) {
    return this.postsService.getPostUser(idUser);
  }
}
