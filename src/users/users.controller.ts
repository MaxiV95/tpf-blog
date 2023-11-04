// users.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  @UseGuards(AdminGuard)
  listUsers() {
    return this.usersService.listUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
