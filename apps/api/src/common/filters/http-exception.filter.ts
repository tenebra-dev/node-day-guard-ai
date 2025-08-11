import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const correlationId = request.headers['x-request-id'] as string || randomUUID();
    const instance = request.originalUrl;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let title = 'Internal Server Error';
    let detail: string | undefined;
    let errors: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      title = res?.error || exception.name;
      detail = typeof res === 'string' ? res : res?.message;
      errors = res?.errors;
    } else if (exception && typeof exception === 'object') {
      detail = (exception as any).message || detail;
    }

    const problem = {
      type: `about:blank`,
      title,
      status,
      detail,
      instance,
      correlationId,
      errors,
    };

    response
      .status(status)
      .setHeader('content-type', 'application/problem+json')
      .setHeader('x-request-id', correlationId)
      .json(problem);
  }
}
