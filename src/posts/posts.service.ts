//posts.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { PostDto, PostDB, ReducedPostDB } from './post.dto';
import { UserAuthDto } from 'src/users/user.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(
    dataNewPost: PostDto,
    user: UserAuthDto,
  ): Promise<PostDB> {
    if (!dataNewPost.title || !dataNewPost.content)
      throw new BadRequestException('Title and content is required');
    const newPost = await this.postModel.create({
      title: dataNewPost.title,
      content: dataNewPost.content,
      categories: dataNewPost.categories,
      idAuthor: user.id,
    });
    const post = await this.postModel
      .findById(newPost.id)
      .populate('idAuthor', '_id nickName')
      .exec();
    return this.toJSON(post);
  }

  async deletePost(id: string, user: UserAuthDto): Promise<any> {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException('Post not found');
    if (!user.admin && post.idAuthor.toString() !== user.id)
      throw new UnauthorizedException(
        'Insufficient privileges for this operation',
      );
    return await this.postModel.deleteOne({ _id: id }).exec();
  }

  /**
   * Obtiene una lista paginada de posts.
   * @param page Número de página deseado (por defecto es 1).
   * @param limit Cantidad de resultados por página (por defecto es 10).
   * @returns Una lista paginada de posts.
   */
  async getAllPost(
    page: number = 1,
    limit: number = 10,
  ): Promise<ReducedPostDB[]> {
    const startIndex = (page - 1) * limit;
    const paginatedPosts = await this.postModel
      .find()
      .skip(startIndex)
      .limit(limit)
      .select('-idAuthor -categories')
      .exec();
    return paginatedPosts.map((post) => this.toJSON(post));
  }

  async getPost(id: string): Promise<PostDB> {
    const post = await this.postModel
      .findById(id)
      .populate('idAuthor', '_id nickName')
      .exec();
    return this.toJSON(post);
  }

  async getPostUser(idUser: string): Promise<ReducedPostDB[]> {
    const posts = await this.postModel
      .find({ idAuthor: idUser })
      .select('-idAuthor -categories')
      .exec();
    if (!posts)
      throw new NotFoundException(`Posts with IDUser ${idUser} not found`);
    return posts.map((post) => this.toJSON(post));
  }

  async updatePost(
    id: string,
    dataPost: PostDto,
    user: UserAuthDto,
  ): Promise<PostDB> {
    const allowedFields = ['title', 'content', 'categories']; // Campos a permitidos
    const updateFields: Record<string, any> = {}; // Campos a actualizar
    allowedFields.forEach((field) => {
      if (dataPost[field] !== undefined) updateFields[field] = dataPost[field];
    });
    const updateQuery = user.admin
      ? { _id: id }
      : { _id: id, idAuthor: user.id };
    const updatedPost = await this.postModel
      .findOneAndUpdate(updateQuery, { $set: updateFields }, { new: true })
      .populate('idAuthor', '_id nickName')
      .exec();
    if (!updatedPost)
      throw new NotFoundException('Post not found or user not authorized');
    return this.toJSON(updatedPost);
  }

  /**
   * Obtiene una lista paginada de posts.
   * Es necesario agregar .populate('idAuthor', '_id nickName') en el llamado a DB
   * @param post Objeto post devuelto por MongoDB.
   * @returns Post formateado.
   */
  private toJSON = (post: any) => {
    return post.toObject({
      transform: (doc: any, ret: Record<string, any>) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        if (ret.idAuthor) {
          ret.author = {
            id: ret.idAuthor.id,
            nickName: ret.idAuthor.nickName,
          };
          delete ret.idAuthor;
        }
      },
    });
  };
}
