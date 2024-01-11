import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { PostDto } from './post.dto';
import { UserAuthDto } from 'src/users/user.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(newPost: PostDto, user: UserAuthDto): Promise<Post> {
    if (!newPost.title || !newPost.content)
      throw new BadRequestException('Title, content and idAuthor is required');
    return await this.postModel.create({
      title: newPost.title,
      content: newPost.content,
      categories: newPost.categories,
      idAuthor: user.id,
    });
  }

  async deletePost(id: string, user: UserAuthDto): Promise<any> {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    if (!user.admin && post.idAuthor.toString() !== user.id)
      throw new UnauthorizedException('Insufficient privileges for this operation');
    return await this.postModel.deleteOne({ _id: id });
  }

  async getAllPost() {
    // Aquí puedes implementar la lógica de paginación y filtrado de posts
    return;
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

  async updatePost(
    id: string,
    updatePost: PostDto,
    user: UserAuthDto,
  ): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    if (!user.admin && post.idAuthor.toString() !== user.id)
      throw new UnauthorizedException('Insufficient privileges for this operation');
    const updateFields: Record<string, any> = {}; // Objeto para almacenar campos a actualizar
    if (updatePost.title !== undefined) updateFields.title = updatePost.title;
    if (updatePost.content !== undefined) updateFields.img = updatePost.content;
    return this.postModel.updateOne({ _id: id }, { $set: updateFields }).lean();
  }
}
