//admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/posts/post.schema';
import { User } from 'src/users/user.schema';
import { UserAuthDto, UserDB } from 'src/users/user.dto';
import { ReducedPostDB } from 'src/posts/post.dto';
import { toJSON } from 'src/posts/postToJSON';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async deleteUser(id: string): Promise<any> {
    return await this.userModel.deleteOne({ _id: id }).lean();
  }

  async getAllUsers(): Promise<UserDB[]> {
    const users = await this.userModel.find();
    return users.map((user) => user.toJSON());
  }

  async getAllPosts(user: UserAuthDto): Promise<ReducedPostDB[]> {
    const query = user.admin ? {} : { idAuthor: user.id };
    const posts = await this.postModel
      .find(query)
      .select('-idAuthor -categories')
      .exec();
    return posts.map((post) => toJSON(post));
  }
}
