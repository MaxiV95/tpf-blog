import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { GithubModule } from './github/github.module';
import { PostsModule } from './posts/posts.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';

import { AppService } from './app.service';
import { DiscordService } from './github/discord.service';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    GithubModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog'),
    PostsModule,
    ProductsModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, DiscordService],
})
export class AppModule {}
