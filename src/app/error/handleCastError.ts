import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const error: TError = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode,
    message: 'Invalid ID',
    error,
  };
};
