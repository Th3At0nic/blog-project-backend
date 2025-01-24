import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { blogValidationSchema } from './blog.validation';
import { BlogControllers } from './blog.controller';
import { auth } from '../../middlewares/authRequest';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema),
  BlogControllers.createBlog,
);

export const BlogRoutes = router;
