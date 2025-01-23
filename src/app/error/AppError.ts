import { TError } from '../interface/error';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly error: TError;
  public readonly isOperational: boolean;

  constructor(
    public readonly message: string,
    statusCode: number,
    error: TError,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.isOperational = isOperational;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
