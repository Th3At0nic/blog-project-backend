import { StatusCodes } from 'http-status-codes';
import throwAppError from '../../utils/throwAppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../user/user.model';
import mongoose from 'mongoose';

const createBlogIntoDB = async (
  payload: TBlog,
  decodedTokenData: JwtPayload,
) => {
  const { userEmail } = decodedTokenData;

  const authorInfo = await UserModel.findOne({ email: userEmail });

  payload.author = authorInfo?._id as mongoose.Types.ObjectId;

  const result = await BlogModel.create(payload);
  if (!result) {
    //throwAppError is an utility function to reduce the boilerplate
    throwAppError(
      'unknown',
      'Internal server error. Could not post the blog.',
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  const populatedResult = await BlogModel.findById(result._id).populate('author');
  return populatedResult;
};

export const BlogServices = {
  createBlogIntoDB,
};
