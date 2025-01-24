/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req, res, next) => {
  const blogData = req.body;
  const userData = req.user;
  const result = await BlogServices.createBlogIntoDB(
    blogData,
    userData as JwtPayload,
  );
  const message = 'Successfully created the blog';
  sendResponse(res, StatusCodes.CREATED, message, result);
});

const updateBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blogData = req.body;
  const decodedTokenData = req.user;
  const result = await BlogServices.updateBlogIntoDB(
    decodedTokenData as JwtPayload,
    id,
    blogData,
  );
  const message = 'Successfully updated the blog';
  sendResponse(res, StatusCodes.OK, message, result);
});

export const BlogControllers = {
  createBlog,
  updateBlog,
};
