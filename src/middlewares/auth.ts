import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function auth(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  const secretJWT = process.env.JWT_SECRET as string;

  if(!authHeader) {
    return response.status(401).send({ message: 'Token is not provided' });
  }
  
  const parts = authHeader.split(' ');
  if(parts.length !== 2) {
    return response.status(401).send({ message: 'Token error' });
  }

  const [ schema, token ] = parts;
  const isBearer = /^Bearer$/i.test(schema);
  if(!isBearer) {
    return response.status(401).send({ message: 'Token badly formatted' });
  }

  jwt.verify(token, secretJWT, (error) => {
    if(error) {
      return response.status(401).send({ message: 'Token invalid' });
    }
  });

  return next();
}

export { auth };
