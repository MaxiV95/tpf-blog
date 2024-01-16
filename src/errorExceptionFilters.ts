//errorExceptionFilters.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (exception instanceof MongoServerError) {
      this.handleMongoError(response, exception);
    } else {
      this.handleException(response, exception);
    }
  }

  private handleMongoError(response: Response, exception: any) {
    const ERROR_HANDLERS = {
      11000: (res: any, err: MongoServerError) => {
        res.status(409).json({ name: err.name, message: err.message }).end();
      },
    };
    const handler = ERROR_HANDLERS[exception.code] || defaultError;
    handler(response, exception, 'handleMongoError');
  }

  private handleException(response: Response, exception: any) {
    const ERROR_HANDLERS = {
      BadRequestException: (res: any, err: Error) => {
        res.status(400).json({ name: err.name, message: err.message }).end();
      },
      CastError: (res: any, err: Error) => {
      res.status(400).json({ name: err.name, message: err.message }).end();
      },
      NotFoundException: (res: any, err: Error) => {
        res.status(404).json({ name: err.name, message: err.message }).end();
      },
      UnauthorizedException: (res: any, err: Error) => {
        res.status(401).json({ name: err.name, message: err.message }).end();
      },
      ValidationError: (res: any, err: Error) => {
        res.status(400).json({ name: err.name, message: err.message }).end();
      },
    };
    const handler = ERROR_HANDLERS[exception.name] || defaultError;
    handler(response, exception, 'handleException');
  }
}

const defaultError = (res: any, err: any, nameError: string) => {
  const name = err.name || err.code || 'Error';
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.log(nameError, err.stack);
  res.status(status).json({ name, message, nameError }).end();
};
