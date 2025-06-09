/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUserByAdmin = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUserByAdminIntoDB(userId);
  const message = 'User is blocked successfully';
  sendResponse(res, StatusCodes.OK, message, result ? null : result);
});

const deleteBlogByAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await AdminServices.deleteBlogByAdminIntoDB(id);
  const message = 'Blog is deleted successfully';
  sendResponse(res, StatusCodes.OK, message, result ? null : result);
});

export const AdminControllers = {
  blockUserByAdmin,
  deleteBlogByAdmin,
};
