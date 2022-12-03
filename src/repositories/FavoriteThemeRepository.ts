import { FavoriteTheme } from '../entities/FavoriteTheme';
import { database } from '../database';

export const FavoriteThemeRepository = database.getRepository(FavoriteTheme);
