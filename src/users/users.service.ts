//users.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async deleteUser(id: string): Promise<User> {
    return this.userModel.deleteOne({ _id: id }).select('-password').lean();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').lean();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user.toJSON();
  }

  async login(loginUserDto: UserLoginDto): Promise<User> {
    if (!loginUserDto.password)
      throw new BadRequestException('Password is required');

    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    return user.toJSON();
  }

  async registerUser(userCreate: UserCreateDto): Promise<User> {
    if (!userCreate.email || !userCreate.password || !userCreate.nickName)
      throw new BadRequestException('Email, password and nickname is required');

    const hashedPassword = await bcrypt.hash(userCreate.password, 10);

    return (
      await this.userModel.create({
        email: userCreate.email,
        password: hashedPassword,
        nickName: userCreate.nickName,
        img: userCreate.img,
      })
    ).toJSON();
  }

  async updateUser(id: string, dataUser: UserUpdateDto): Promise<User> {
    const updateFields: Record<string, any> = {}; // Objeto para almacenar campos a actualizar

    if (dataUser.nickName !== undefined)
      updateFields.nickName = dataUser.nickName;

    if (dataUser.img !== undefined) updateFields.img = dataUser.img;

    return this.userModel
      .updateOne({ _id: id }, { $set: updateFields })
      .select('-password')
      .lean();
  }
}
