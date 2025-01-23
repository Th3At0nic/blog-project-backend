/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { TErrorSource } from '../interface/error';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  const success = err.success;
  const errorSource: TErrorSource = err.errorSource;
  const message = err.message;

  res.status(500).json({
    success: success,
    message: message,
    errorSource: errorSource,
    ...(config.node_env === 'development' ? { stack: err.stack } : null),
  });
};
