import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
