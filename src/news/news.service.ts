import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NewsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getNews() {
    return this.httpService.axiosRef.get(
      `${this.configService.get('newsApiUrl')}/everything?q=bitcoin`,
      {
        headers: {
          'X-Api-Key': `${this.configService.get('newsApiKey')}`,
        },
      },
    );
  }
}
