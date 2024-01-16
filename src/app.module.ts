//app.module.ts
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import type { RedisClientOptions } from 'redis';
// import { redisStore } from 'cache-manager-redis-yet';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { GithubModule } from './github/github.module';
import { NewsModule } from './news/news.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

import { DiscordService } from './github/discord.service';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    ChatModule,
    CacheModule.register({ isGlobal: true }),
    /* CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
     }), */
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    GithubModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog'),
    NewsModule,
    PostsModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    UsersModule,
  ],
  providers: [DiscordService],
})
export class AppModule {}
