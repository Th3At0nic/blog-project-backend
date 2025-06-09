/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const registerUser = catchAsync(async (req, res, next) => {
  const result = await UserServices.registerUserIntoDB(req.body);
  const message = 'Successfully registered the user.';

  sendResponse(res, StatusCodes.CREATED, message, result);
});

export const UserControllers = {
  registerUser,
};
