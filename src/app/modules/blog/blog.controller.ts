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
  const message = 'Created the blog successfully';
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
  const message = 'Updated the blog successfully';
  sendResponse(res, StatusCodes.OK, message, result);
});

const deleteBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const decodedTokenData = req.user;
  const result = await BlogServices.deleteBlogFromDB(
    decodedTokenData as JwtPayload,
    id,
  );
  const message = 'Deleted the blog successfully';
  sendResponse(res, StatusCodes.OK, message, result ? null : result);
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
};
