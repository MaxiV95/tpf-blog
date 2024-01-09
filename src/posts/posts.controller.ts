// posts.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id') // login o admin
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

  @Put(':id') // login o admin
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

  @Delete(':id') // login o admin
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

  @Get() // param paginado, default 10
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los posteos' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: [PostDB],
  })
  @UseGuards(JwtAuthGuard)
  listPosts() {
    return this.postsService.getAllPost();
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

  @Get('user/:idUser') // ver post de user
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los posteos de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Retorna los datos del posteo.',
    type: [PostDB],
  })
  @UseGuards(JwtAuthGuard)
  getPostUser(@Param('idUser') idUser: string) {
    return this.postsService.getPostUser(idUser);
  }
}
