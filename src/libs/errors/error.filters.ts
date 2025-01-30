import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BadRequestError, BaseError, ExternalServerError, ValidationError } from './base.error';
import { Response } from 'express';

const defaultHttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;

const errors = [
  [ExternalServerError, HttpStatus.BAD_GATEWAY],
  [BadRequestError, HttpStatus.BAD_REQUEST],
  [ValidationError, HttpStatus.BAD_REQUEST],
] as const;

@Catch(BaseError)
export class ErrorFilters implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const statusCode = this.mapErrors(exception);

    response.status(statusCode).json({
      statusCode,
      message: exception.message,
    });
  }

  private mapErrors(error: BaseError) {
    const [, statusCode] = errors.find(([errorClass]) => error instanceof errorClass) ?? [];

    return statusCode ?? defaultHttpStatusCode;
  }
}
