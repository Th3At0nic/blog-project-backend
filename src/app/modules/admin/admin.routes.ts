import { Router } from 'express';
import { auth } from '../../middlewares/authRequest';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

const router = Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockUserByAdmin,
);

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminControllers.deleteBlogByAdmin,
);

export const AdminRoutes = router;
