import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  blogValidationSchema,
  updateBlogValidationSchema,
} from './blog.validation';
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

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog);

router.get(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.getAllBlogs,
);

export const BlogRoutes = router;
