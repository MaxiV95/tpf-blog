import { Controller, Get, HttpException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './httpExceptionFilter';

class EjemploHttpException extends HttpException {
  constructor(message: string) {
    super(message, 403);
  }
}

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new EjemploHttpException('mi app fallo :( No autorizado');
    return this.appService.getHello();
  }
}
