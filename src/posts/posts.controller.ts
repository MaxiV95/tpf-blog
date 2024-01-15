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
import { FullPostDB, PostDto, ReducedPostDB } from './post.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { User } from 'src/auth/custom.decorator.ts';
import { UserAuthDto } from 'src/users/user.dto';
import { ErrorFilter } from 'src/errorExceptionFilters';

@ApiTags('Posts')
@Controller('posts')
@UseFilters(ErrorFilter)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener posteo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: FullPostDB,
  })
  @HttpCode(200)
  getPost(@Param('id') id: string): Promise<FullPostDB> {
    return this.postsService.getPost(id);
  }

  @Put(':id') // user o admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modificar posteo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo modificado.',
    type: FullPostDB,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  updatePost(
    @Param('id') id: string,
    @Body() updatePost: PostDto,
    @User() user: UserAuthDto,
  ): Promise<FullPostDB> {
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
  @HttpCode(200)
  deletePost(
    @Param('id') id: string,
    @User() user: UserAuthDto,
  ): Promise<any[]> {
    return this.postsService.deletePost(id, user);
  }

  // /api/posts?page=2&limit=15
  @Get() // param paginado, default 10
  @ApiOperation({ summary: 'Obtener todos los posteos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los posteos.',
    type: [ReducedPostDB],
  })
  @HttpCode(200)
  listPosts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ReducedPostDB[]> {
    return this.postsService.getAllPost(page, limit);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear posteo' })
  @ApiResponse({
    status: 201,
    description: 'Retorna los datos del posteo.',
    type: FullPostDB,
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  createPost(
    @Body() dataPost: PostDto,
    @User() user: UserAuthDto,
  ): Promise<FullPostDB> {
    return this.postsService.createPost(dataPost, user);
  }

  @Get('user/:idUser')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los posteos de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los posteos.',
    type: [ReducedPostDB],
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  getPostUser(@Param('idUser') idUser: string): Promise<ReducedPostDB[]> {
    return this.postsService.getPostUser(idUser);
  }
}
