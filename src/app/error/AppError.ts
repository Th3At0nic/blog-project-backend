import { TError } from '../interface/error';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorSource: TError;
  public readonly isOperational: boolean;

  constructor(
    public readonly message: string,
    statusCode: number,
    errorSource: TError,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorSource = errorSource;
    this.isOperational = isOperational;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
