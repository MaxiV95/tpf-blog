import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CustomError } from 'src/errorExceptionFilters';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.password ||
      !createUserDto.nickName
    )
      throw new CustomError(
        'Email, password and nickname is required',
        400,
        'InvalidInputError',
      );

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return (await this.userModel
      .create({ ...createUserDto, password: hashedPassword }))
      .toJSON();
  }

  async login(loginUserDto: LoginUserDto) {
    if (!loginUserDto.password)
      throw new CustomError('Password is required', 400, 'InvalidInputError');

    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    return user.toJSON();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').lean();
  }

  async getUser(id: string): Promise<User> {
    return this.userModel.findById(id).select('-password').lean(); // or findOne({ uid: id })
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.updateOne({ _id: id }, updateUserDto).select('-password').lean();
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.deleteOne({ _id: id }).select('-password').lean();
  }
}
