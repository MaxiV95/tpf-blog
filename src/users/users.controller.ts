// users.controller.ts
import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseFilters
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { ErrorFilter } from 'src/errorExceptionFilters';

@Controller('users')
@UseFilters(ErrorFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id') // login
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get() // admin
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('login') // auth
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Put(':id') // login o admin
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id') // admin
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
