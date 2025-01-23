import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post('/register', UserControllers.registerUser);

export const UserRoutes = router;
