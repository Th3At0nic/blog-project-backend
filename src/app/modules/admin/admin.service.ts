import { StatusCodes } from 'http-status-codes';
import throwAppError from '../../utils/throwAppError';
import { UserModel } from '../user/user.model';
import { BlogModel } from '../blog/blog.model';

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

  const result = await UserModel.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true },
  );

  if (!result) {
    throwAppError(
      'params.userId',
      `Failed to block user with id: ${userId}`,
      StatusCodes.INTERNAL_SERVER_ERROR, // If the update fails, server error
    );
  }

  return result;
};

const deleteBlogByAdminIntoDB = async (blogId: string) => {
  const isBlogExists = await BlogModel.findById(blogId);

  if (!isBlogExists) {
    throwAppError(
      'params.id',
      `Blog not found with the id: ${blogId}`,
      StatusCodes.NOT_FOUND,
    );
  }

  //this block of code is not given as assignment,
  // i did it as a choice as it does not conflict with assignment, but a extra feature might be used in future
  if (!isBlogExists?.isPublished) {
    throwAppError(
      'params.id',
      `Blog with the id: ${blogId} is not published. So not deleted`,
      StatusCodes.FORBIDDEN,
    );
  }

  const result = await BlogModel.findByIdAndDelete(blogId);

  if (!result) {
    throwAppError(
      'params.id',
      `Failed to delete the blog with id: ${blogId}`,
      StatusCodes.INTERNAL_SERVER_ERROR, // If the update fails, server error
    );
  }

  return result;
};

export const AdminServices = {
  blockUserByAdminIntoDB,
  deleteBlogByAdminIntoDB,
};
