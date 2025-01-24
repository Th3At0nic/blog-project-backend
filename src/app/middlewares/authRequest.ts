import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import throwAppError from '../utils/throwAppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { UserModel } from '../modules/user/user.model';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throwAppError(
        'authorization',
        'Authorization is required to access this resource.',
        StatusCodes.UNAUTHORIZED,
      );
    }

    // check if the token is valid
    // invalid token
    //--i can avoid using try-catch block here as my instructor did it, but i did it to define the error msg
    //structure , otherwise it would only show "signature invalid" message and no path
    try {
      const decoded = jwt.verify(
        token as string,
        config.jwt_access_secret as string,
      );

      // decoded undefined
      const { userEmail, role } = decoded as JwtPayload;

      req.user = decoded as JwtPayload;

      if (requiredRoles && !requiredRoles.includes(role)) {
        const message =
          'You are not authorized to perform this action. This resource is restricted to users with specific roles. If you believe this is an error, please contact the administrator.';
        throwAppError('authorization', message, StatusCodes.UNAUTHORIZED);
      }

      const user = await UserModel.isUserExists(userEmail);

      if (!user) {
        throwAppError(
          'email',
          `The User with the provided email: ${userEmail} not found in the system. Please recheck the email and try again`,
          StatusCodes.UNAUTHORIZED,
        );
      }

      const isUserBlocked = user?.isBlocked;
      if (isUserBlocked) {
        throwAppError(
          'email',
          `The user with the provided email: ${userEmail} is currently blocked. Access is restricted until the block is lifted.`,
          StatusCodes.FORBIDDEN,
        );
      }

      next();
    } catch (err) {
      //--i can avoid using try-catch block here as my instructor did it, but i did it to define the error msg
      //structure , otherwise it would only show "signature invalid" message and no path
      if (
        err instanceof jwt.JsonWebTokenError ||
        err instanceof jwt.TokenExpiredError
      ) {
        const message =
          'Your session has expired or the token is invalid. Please login again to continue.';

        throwAppError('authorization', message, StatusCodes.UNAUTHORIZED);
      }
      // If another error occurs, pass it to the next middleware
      next(err);
    }
  });
};
