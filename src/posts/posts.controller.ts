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
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post() // login
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get() // param paginado, default 10
  listPosts() {
    return this.postsService.listPosts();
  }

  @Get(':id') // ver detalles
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Get('user/:idUser') // ver post de user
  getPostUser(@Param('idUser') idUser: string) {
    return this.postsService.getPostUser(idUser);
  }

  @Put(':id') // login o admin
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id') // login o admin
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
