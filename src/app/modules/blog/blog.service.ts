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
  const populatedResult = await BlogModel.findById(result._id).populate(
    'author',
  );
  return populatedResult;
};

const updateBlogIntoDB = async (
  decodedTokenData: JwtPayload,
  blogId: string,
  payload: Partial<TBlog>,
) => {
  const userRequestingUpdate = await UserModel.findOne({
    email: decodedTokenData.userEmail,
  }).select('_id');

  if (!userRequestingUpdate) {
    throwAppError(
      'authorization.token',
      'Invalid or expired authorization token. Please log in again.',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const requestedBlog = await BlogModel.findById(blogId);

  if (!requestedBlog) {
    throwAppError(
      'params.id',
      `No blog found with the provided ID: ${blogId}`,
      StatusCodes.NOT_FOUND,
    );
  }

  if (
    userRequestingUpdate?._id.toString() !== requestedBlog?.author.toString()
  ) {
    throwAppError(
      'authorization.user',
      'You are not authorized to update this blog.',
      StatusCodes.FORBIDDEN, // Use 403 for unauthorized access to a valid resource
    );
  }

  const result = await BlogModel.findByIdAndUpdate(blogId, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    //throwAppError is an utility function to reduce the boilerplate
    throwAppError(
      'unknown',
      'Internal server error. Could not post the blog.',
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  const populatedResult = await BlogModel.findById(result?._id).populate(
    'author',
  );
  return populatedResult;
};

const deleteBlogFromDB = async (
  decodedTokenData: JwtPayload,
  blogId: string,
) => {
  const userRequestingDelete = await UserModel.findOne({
    email: decodedTokenData.userEmail,
  });

  if (!userRequestingDelete) {
    throwAppError(
      'authorization.token',
      'Invalid or expired authorization token. Please log in again.',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const requestedBlog = await BlogModel.findById(blogId);

  if (!requestedBlog) {
    throwAppError(
      'params.id',
      `No blog found with the provided ID: ${blogId}`,
      StatusCodes.NOT_FOUND,
    );
  }

  if (
    userRequestingDelete?.role === 'user' &&
    userRequestingDelete?._id.toString() !== requestedBlog?.author.toString()
  ) {
    throwAppError(
      'authorization.user',
      'You are not authorized to update this blog.',
      StatusCodes.FORBIDDEN, // Use 403 for unauthorized access to a valid resource
    );
  }

  const result = await BlogModel.findByIdAndDelete(blogId);

  if (!result) {
    //throwAppError is an utility function to reduce the boilerplate
    throwAppError(
      'unknown',
      'Internal server error. Could not post the blog.',
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
