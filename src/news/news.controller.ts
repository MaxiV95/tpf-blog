import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import {
  CACHE_MANAGER,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
} from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { NewsService } from './news.service';

@Controller('/news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Gestor manual de cache
  @Get()
  async news() {
    const cachedNews = await this.cacheManager.get('news');
    if (!cachedNews) {
      const { data } = await this.newsService.getNews();
      await this.cacheManager.set('news', data, 0); //0 no expira, tiempo en ms
      return data;
    }
    return cachedNews;
  }

  // Automático con decorador
  @UseInterceptors(CacheInterceptor)
  @CacheKey('more')
  @CacheTTL(0)
  @Get('/more')
  async otherNews() {
    const { data } = await this.newsService.getNews();
    return data;
  }
}
