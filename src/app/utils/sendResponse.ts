import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  result: T,
) => {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: result,
  });
};

export default sendResponse;
