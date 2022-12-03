import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { FavoriteThemeRepository } from '../repositories/FavoriteThemeRepository';

interface UserAuth {
  id: string;
}

class FavoriteThemeController {
  async create(request: Request, response: Response) {
    try {
      const { theme } = request.body;

      const authHeader = request.headers.authorization.split(' ');
      const userAuth = jwt.decode(authHeader[1]) as UserAuth;

      const scheme = Yup.object().shape({
        theme: Yup.string().required('theme field is required'),
      });

      await scheme.validate({ theme }, { abortEarly: false });

      await FavoriteThemeRepository.save({
        user_id: userAuth.id,
        theme,
      });

      return response.sendStatus(201);
    } catch (error) {
      console.error(error);
      if(error instanceof Yup.ValidationError) {
        return response.status(400).send({message: error.message, errors: error.errors});
      }

      return response.status(500).send({ message: 'internal error server' });
    }
  }

  async list(request: Request, response: Response) {
    try {
      const authHeader = request.headers.authorization.split(' ');
      const userAuth = jwt.decode(authHeader[1]) as UserAuth;

      const favoriteThemes = await FavoriteThemeRepository.findBy({
        user_id: userAuth.id,
      });

      return response.status(200).send(favoriteThemes);
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: 'internal error server' });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      
      const favoriteTheme = await FavoriteThemeRepository.findOne({
        where: {
          id,
        }
      });
      
      if(!favoriteTheme) {
        return response.status(404).send({ message: 'favorite theme is not found' });
      }

      await FavoriteThemeRepository.delete(favoriteTheme.id);

      return response.sendStatus(204);
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: 'internal error server' });
    }
  }
}

export { FavoriteThemeController }
