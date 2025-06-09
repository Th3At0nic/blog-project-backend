import { StatusCodes } from 'http-status-codes';

import { TUser } from './user.interface';
import { UserModel } from './user.model';
import throwAppError from '../../utils/throwAppError';

const registerUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);

  if (!result) {
    //throwAppError is an utility function to reduce the boilerplate
    throwAppError(
      'unknown',
      'Internal server error. Could not register the user.',
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  const { name, email, _id } = result;

  return { _id, name, email };
};

export const UserServices = {
  registerUserIntoDB,
};
