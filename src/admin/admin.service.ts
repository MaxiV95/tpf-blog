//admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/posts/post.schema';
import { User } from 'src/users/user.schema';
import { UserDB } from 'src/users/user.dto';

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

  // async getAllPosts() {
  //   const posts = this.postModel.find().lean();
  //   const moderatedPosts = this.applyModerationOptions(posts);
  //   return moderatedPosts;
  // }

  // private applyModerationOptions(posts: PostDB[]): ModeratedPostDTO[] {
  //   return posts.map((post) => ({
  //     ...post,
  //     moderationOptions: {
  //       delete: true,
  //       edit: true,
  //     },
  //   }));
  // }
}
