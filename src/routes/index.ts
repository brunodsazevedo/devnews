import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';
import { FavoriteThemeController } from '../controllers/FavoriteThemeController';
import { NewsController } from '../controllers/NewsController';

import { auth } from '../middlewares/auth';

const authController = new AuthController();
const favoriteThemeController = new FavoriteThemeController();
const newsController = new NewsController();

const routes = Router();

routes.get('/news/top-news', auth, newsController.getTopNews);
routes.get('/news/news-by-theme/:id', auth, newsController.getNewsByTheme);

routes.post('/favorite-themes', auth, favoriteThemeController.create);
routes.get('/favorite-themes', auth, favoriteThemeController.list);
routes.delete('/favorite-themes/:id', auth, favoriteThemeController.delete);

routes.post('/sign-up', authController.create);
routes.post('/sign-in', authController.login);

export { routes };
