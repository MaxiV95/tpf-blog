//users.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { UserCreateDto, UserDB, UserUpdateDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async deleteUser(id: string): Promise<any> {
    return await this.userModel.deleteOne({ _id: id }).lean();
  }

  async getAllUsers(): Promise<UserDB[]> {
    const users = await this.userModel.find();
    return users.map((user) => user.toJSON());
  }

  async getUser(id: string): Promise<UserDB> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user.toJSON();
  }

  async registerUser(dataNewUser: UserCreateDto): Promise<UserDB> {
    if (!dataNewUser.email || !dataNewUser.password || !dataNewUser.nickName)
      throw new BadRequestException('Email, password and nickname is required');
    const hashedPassword = await bcrypt.hash(dataNewUser.password, 10);
    return (
      await this.userModel.create({
        email: dataNewUser.email,
        password: hashedPassword,
        nickName: dataNewUser.nickName,
        img: dataNewUser.img,
      })
    ).toJSON();
  }

  async updateUser(
    id: string,
    dataUser: UserUpdateDto,
    isAdmin: boolean,
  ): Promise<UserDB> {
    const allowedFields = ['nickName', 'img']; // Campos a permitidos
    if (isAdmin) allowedFields.push('admin');
    const updateFields: Record<string, any> = {}; // Campos a actualizar
    allowedFields.forEach((field) => {
      if (dataUser[field] !== undefined) updateFields[field] = dataUser[field];
    });
    return (
      await this.userModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateFields },
        { new: true },
      )
    ).toJSON();
  }
}
