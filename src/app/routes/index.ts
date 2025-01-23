import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const routeModules = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

routeModules.forEach((route) => router.use(route.path, route.route));

export default router;
