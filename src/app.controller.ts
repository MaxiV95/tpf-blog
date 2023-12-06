import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomError, ErrorFilter } from './errorExceptionFilters';

@Controller()
@UseFilters(ErrorFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new CustomError('mi app fallo :( No autorizado', 403, 'Personalizado');
    return this.appService.getHello();
  }
}
