import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

export class CustomError extends Error {
  constructor(message: string, public status: number, name: string = 'CustomError') {
    super(message);
    this.name = name;
  }
}

const ERROR_HANDLERS = {
  ValidationError: (res: any, err: Error) => {
    const name = err.name;
    const status = 400;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ name, message }).end();
  },
  defaultError: (res: any, err: any) => {
    const name = err.name || err.code || 'Error';
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ name, message }).end();
  },
};

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  //private readonly logger = new Logger(ErrorFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    //this.logger.error(exception);
    const handler =
      ERROR_HANDLERS[exception.name] || ERROR_HANDLERS.defaultError;
    handler(response, exception);
  }
}
