//errorExceptionFilters.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

export class CustomError extends Error {
  constructor(
    message: string,
    public status: number,
    name: string = 'CustomError',
  ) {
    super(message);
    this.name = name;
  }
}

const ERROR_HANDLERS = {
  BadRequestException: (res: any, err: Error) => {
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
  defaultError: (res: any, err: any) => {
    const name = err.name || err.code || 'Error';
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.log(err.stack);
    res.status(status).json({ name, message }).end();
  },
};

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const handler =
      ERROR_HANDLERS[exception.name] || ERROR_HANDLERS.defaultError;
    handler(response, exception);
  }
}
