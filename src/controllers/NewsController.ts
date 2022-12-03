import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { FavoriteThemeRepository } from '../repositories/FavoriteThemeRepository';

import { newsApiService } from '../services/newsApi';

interface UserAuth {
  id: string;
}

class NewsController {
  async getTopNews(request: Request, response: Response) {
    try {
      const authHeader = request.headers.authorization.split(' ');
      const userAuth = jwt.decode(authHeader[1]) as UserAuth;

      const favoriteThemesByUser = await FavoriteThemeRepository.find({
        where: {
          user_id: userAuth.id,
        },
      });

      let queriesFormatted = '';

      favoriteThemesByUser.map((favoriteTheme, index) => {
        if(favoriteThemesByUser.length -1 === index) {
          queriesFormatted = queriesFormatted + favoriteTheme.theme;
        } else {
          queriesFormatted = queriesFormatted + favoriteTheme.theme + ' OR ';
        }
      });
      
      const news = await newsApiService.get('/v2/everything', {
        params: {
          q: queriesFormatted,
          pageSize: 8,
          sortBy: 'relevancy',
          language: 'pt',
        }
      });

      return response.status(200).send(news.data);
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: 'internal error server' });
    }
  }

  async getNewsByTheme(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { page = 1 } = request.query;

      const favoriteThemeData = await FavoriteThemeRepository.findOne({
        where: {
          id,
        }
      });
      if(!favoriteThemeData) {
        return response.status(404).send({message: 'Theme id is not found'});
      }

      const news = await newsApiService.get('/v2/everything', {
        params: {
          q: favoriteThemeData.theme,
          sortBy: 'publishedAt',
          language: 'pt',
          page,
        }
      });

      return response.status(200).send(news.data);
    } catch (error) {
      console.error(error);
      return response.status(500).send({ message: 'internal error server' });
    }
  }
}

export { NewsController }
