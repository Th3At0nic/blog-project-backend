/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { TErrorSource } from '../interface/error';
import { ZodError } from 'zod';
import { handleZodError } from '../utils/error/handleZodError';
import { handleMongooseError } from '../utils/error/handleMongooseError';
import { handleCastError } from '../utils/error/handleCastError';
import { handleDuplicateError } from '../utils/error/handleDuplicateError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  const success = err.success;
  let errorSource: TErrorSource = err.errorSource || [
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
    errorSource = simplifiedError.errorSource;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }

  res.status(statusCode).json({
    success: success,
    message: message,
    errorSource: errorSource,
    ...(config.node_env === 'development' ? { stack: err.stack } : null),
  });
};
