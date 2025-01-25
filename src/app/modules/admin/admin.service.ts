import { StatusCodes } from 'http-status-codes';
import throwAppError from '../../utils/throwAppError';
import { UserModel } from '../user/user.model';

const blockUserByAdminIntoDB = async (userId: string) => {
  const isUserExists = await UserModel.findById(userId);

  if (!isUserExists) {
    throwAppError(
      'params.userId',
      `User not found with the id: ${userId}`,
      StatusCodes.NOT_FOUND,
    );
  }

  if (isUserExists?.isBlocked) {
    throwAppError(
      'params.userId',
      `User is already blocked with the id: ${userId}`,
      StatusCodes.FORBIDDEN,
    );
  }

  const result = await UserModel.findByIdAndUpdate(userId, { isBlocked: true });

  if (!result) {
    throwAppError(
      'params.userId',
      `Failed to block user with id: ${userId}`,
      StatusCodes.INTERNAL_SERVER_ERROR, // If the update fails, server error
    );
  }

  return result;
};

export const AdminServices = {
  blockUserByAdminIntoDB,
};
