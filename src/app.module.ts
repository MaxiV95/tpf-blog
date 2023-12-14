import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { redisStore } from 'cache-manager-redis-yet';
import type { RedisClientOptions } from 'redis';
import { join } from 'path';
import config from './config';

import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { GithubModule } from './github/github.module';
import { NewsModule } from './news/news.module';
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
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      }
    }),
    ConfigModule.forRoot({isGlobal: true, load: [config]}),
    GithubModule,
    MongooseModule.forRoot('mongodb://localhost:27017/blog'),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog'),
    NewsModule,
    PostsModule,
    ProductsModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    UsersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, DiscordService],
})
export class AppModule {}
