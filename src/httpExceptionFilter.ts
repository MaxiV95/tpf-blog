import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({ message: message });
  }
}
