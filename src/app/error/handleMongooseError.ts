import mongoose from 'mongoose';
import { TError, TGenericErrorResponse } from '../interface/error';

export const handleMongooseError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;
  const error: TError = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.name,
        message: val.message,
      };
    },
  );
  return {
    statusCode,
    message: 'Validation Error',
    error,
  };
};
