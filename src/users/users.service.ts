import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './user.schema';
import { CustomError } from 'src/errorExceptionFilters';
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
    return this.userModel.findById(id).select('-password').lean(); // or findOne({ uid: id })
  }

  async login(loginUserDto: UserLoginDto): Promise<User> {
    if (!loginUserDto.password)
      throw new CustomError('Password is required', 400, 'InvalidInputError');

    const user = await this.userModel.findOne({ email: loginUserDto.email });

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    return user.toJSON();
  }

  async register(newUser: UserCreateDto): Promise<User> {
    if (!newUser.email || !newUser.password || !newUser.nickName)
      throw new CustomError(
        'Email, password and nickname is required',
        400,
        'InvalidInputError',
      );

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    return (
      await this.userModel.create({ ...newUser, password: hashedPassword })
    ).toJSON();
  }

  async updateUser(id: string, dataUser: UserUpdateDto): Promise<User> {
    const updateFields: Record<string, any> = {}; // Objeto para almacenar campos a actualizar

    if (dataUser.nickName !== undefined) updateFields.nickName = dataUser.nickName;

    if (dataUser.img !== undefined) updateFields.img = dataUser.img;

    return this.userModel
      .updateOne({ _id: id }, { $set: updateFields })
      .select('-password')
      .lean();
  }
}
