import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

import { auth } from '../middlewares/auth';

const authController = new AuthController();

const routes = Router();

routes.post('/register', authController.create);
routes.post('/sign-in', authController.login);

export { routes };
