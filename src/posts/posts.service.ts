import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { PostDto } from './post.dto';
import { CustomError } from 'src/errorExceptionFilters';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(newPost: PostDto): Promise<Post> {
    if (!newPost.title || !newPost.content || !newPost.idAuthor)
      throw new CustomError(
        'Title, content and idAuthor is required',
        400,
        'InvalidInputError',
      );

    return await this.postModel.create(newPost);
  }

  async deletePost(id: string): Promise<Post> {
    return this.postModel.deleteOne({ _id: id }).lean();
  }

  async getPost(id: string): Promise<Post> {
    return this.postModel.findById(id).lean();
  }

  async getPostUser(idUser: string): Promise<Post[]> {
    const posts = this.postModel.find({ idAuthor: idUser }).lean();

    if (!posts)
      throw new NotFoundException(`Posts with IDUser ${idUser} not found`);

    return posts;
  }

  async listPosts() {
    // Aquí puedes implementar la lógica de paginación y filtrado de posts
    return;
  }

  async updatePost(id: string, updatePost: PostDto): Promise<Post> {
    const updateFields: Record<string, any> = {}; // Objeto para almacenar campos a actualizar

    if (updatePost.title !== undefined) updateFields.title = updatePost.title;

    if (updatePost.content !== undefined) updateFields.img = updatePost.content;

    return this.postModel.updateOne({ _id: id }, { $set: updateFields }).lean();
  }
}
