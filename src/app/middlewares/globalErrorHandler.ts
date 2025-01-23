/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { TError } from '../interface/error';
import { ZodError } from 'zod';
import { handleZodError } from '../error/handleZodError';
import { handleMongooseError } from '../error/handleMongooseError';
import { handleCastError } from '../error/handleCastError';
import { handleDuplicateError } from '../error/handleDuplicateError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  const success = err.success || false;
  let error: TError = err.error || [
    {
      path: '',
      message: err.message || 'Something went wrong',
    },
  ];

  let message = err.message || 'Something went wrong';

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    error = simplifiedError.error;
  }

  res.status(statusCode).json({
    success: success,
    message: message,
    statusCode,
    error: error,
    ...(config.node_env === 'development' ? { stack: err.stack } : null),
  });
};
