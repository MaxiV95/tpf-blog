import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog'),
    AuthModule,
    PostsModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
