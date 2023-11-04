import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostsService {
  private posts = []; // Debes conectar con tu base de datos MongoDB

  createPost(createPostDto: CreatePostDto) {
    // Aquí puedes realizar validaciones y crear un nuevo post
    const newPost = {
      id: Date.now().toString(),
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  listPosts() {
    // Aquí puedes implementar la lógica de paginación y filtrado de posts
    return this.posts;
  }

  getPost(id: string) {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  updatePost(id: string, updatePostDto: UpdatePostDto) {
    const post = this.getPost(id);
    // Aquí puedes implementar la lógica de actualización
    Object.assign(post, updatePostDto);
    return post;
  }

  deletePost(id: string) {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(index, 1);
  }
}
