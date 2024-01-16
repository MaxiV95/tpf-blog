// posts.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { PostDto, PostDB, ReducedPostDB } from './post.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { User } from 'src/auth/custom.decorator.ts';
import { UserAuthDto } from 'src/users/user.dto';
import { ErrorFilter } from 'src/errorExceptionFilters';

@ApiTags('Posts')
@Controller('posts')
@UseFilters(ErrorFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // /api/posts?page=2&limit=15
  @Get() // param paginado, default 10
  @ApiOperation({ summary: 'Obtener todos los posteos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los posteos.',
    type: [ReducedPostDB],
  })
  @HttpCode(200)
  async listPosts(
    @Query('page') page: number,
    @Query('limit') limit?: number,
  ): Promise<ReducedPostDB[]> {
    return await this.postsService.getAllPost(page || 1, limit || 10);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar posts por título, contenido, etc.' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los resultados de la búsqueda.',
    type: [ReducedPostDB],
  })
  @HttpCode(200)
  async searchPosts(
    @Query('query') query: string,
    @Query('page') page: number,
    @Query('limit') limit?: number,
  ): Promise<ReducedPostDB[]> {
    return await this.postsService.searchPosts(query, page || 1, limit || 10);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filtrar posts por categoría o autor.' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los posts filtrados.',
    type: [ReducedPostDB],
  })
  @HttpCode(200)
  async filterPosts(
    @Query('category') category: string,
    @Query('author') author: string,
    @Query('page') page: number,
    @Query('limit') limit?: number,
  ): Promise<ReducedPostDB[]> {
    return await this.postsService.filterPosts(
      category,
      author,
      page || 1,
      limit || 10,
    );
  }

  @Get('user/:idUser')
  @ApiOperation({ summary: 'Obtener todos los posteos de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los posteos.',
    type: [ReducedPostDB],
  })
  @HttpCode(200)
  async getPostUser(@Param('idUser') idUser: string): Promise<ReducedPostDB[]> {
    return await this.postsService.getPostUser(idUser);
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
  @HttpCode(201)
  async createPost(
    @Body() dataPost: PostDto,
    @User() user: UserAuthDto,
  ): Promise<PostDB> {
    return await this.postsService.createPost(dataPost, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener posteo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: PostDB,
  })
  @HttpCode(200)
  async getPost(@Param('id') id: string): Promise<PostDB> {
    return await this.postsService.getPost(id);
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
  @HttpCode(200)
  async updatePost(
    @Param('id') id: string,
    @Body() updatePost: PostDto,
    @User() user: UserAuthDto,
  ): Promise<PostDB> {
    return await this.postsService.updatePost(id, updatePost, user);
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
  @HttpCode(200)
  async deletePost(
    @Param('id') id: string,
    @User() user: UserAuthDto,
  ): Promise<any> {
    return await this.postsService.deletePost(id, user);
  }
}
