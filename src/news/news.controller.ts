import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('/news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async news() {
    const cachedNews = await this.cacheManager.get('news');
    if (!cachedNews) {
      const { data } = await this.newsService.getNews();
      await this.cacheManager.set('news', data, 0);
      return data;
    }
    return cachedNews;
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('more')
  @CacheTTL(0)
  @Get('/more')
  async otherNews() {
    const { data } = await this.newsService.getNews();
    return data;
  }
}
