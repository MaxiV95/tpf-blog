// posts.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { PostDB, PostDto } from './post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id') // ver detalles
  @ApiOperation({ summary: 'Obtener posteo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: PostDB,
  })
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Put(':id') // login o admin
  @ApiOperation({ summary: 'Modificar posteo' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: PostDB,
  })
  updatePost(@Param('id') id: string, @Body() updatePost: PostDto) {
    return this.postsService.updatePost(id, updatePost);
  }

  @Delete(':id') // login o admin
  @ApiOperation({ summary: 'Eliminar posteo' })
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

  @Get() // param paginado, default 10
  @ApiOperation({ summary: 'Obtener todos los posteos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: [PostDB],
  })
  listPosts() {
    return this.postsService.listPosts();
  }

  @Post() // login
  @ApiOperation({ summary: 'Crear posteo' })
  @ApiResponse({
    status: 201,
    description: 'Retorna los datos del posteo.',
    type: PostDB,
  })
  createPost(@Body() createPost: PostDto) {
    return this.postsService.createPost(createPost);
  }

  @Get('user/:idUser') // ver post de user
  @ApiOperation({ summary: 'Obtener todos los posteos de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: [PostDB],
  })
  getPostUser(@Param('idUser') idUser: string) {
    return this.postsService.getPostUser(idUser);
  }
}
