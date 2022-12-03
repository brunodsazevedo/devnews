import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as Yup from 'yup';

import { UserRepository } from '../repositories/UserRepository';

class AuthController {
  async create(request: Request, response: Response) {
    try {
      const data = request.body;

      const schema = Yup.object().shape({
        full_name: Yup.string().required('Full is required'),
        email: Yup.string().email('Email is not valid').required('Email is required'),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, { abortEarly: false });

      const isEmailAlreadyExist = await UserRepository.findOneBy({
        email: data.email,
      });

      if(isEmailAlreadyExist) {
        return response.status(409).send({ error: 'Email is already exist' });
      }
      
      data.password = await bcrypt.hash(data.password, 10);

      await UserRepository.save({
        ...data,
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

  async login(request: Request, response: Response) {
    try {
      const data = request.body;

      const schema = Yup.object().shape({
        email: Yup.string().email('email is not valid').required('Email is required'),
        password: Yup.string().required('password is required'),
      });

      await schema.validate(data, { abortEarly: false });

      const user = await UserRepository.findOneBy({
        email: data.email
      });
      if(!user) {
        return response.status(400).send({ message: 'email or password is wrong' });
      }

      const isCheckPassword = await bcrypt.compare(data.password, user.password);
      if(!isCheckPassword) {
        return response.status(400).send({ message: 'email or password is wrong' });
      }

      const jwtSecret = process.env.JWT_SECRET! as string;

      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: 60 * 60,
      });

      delete user.password;

      return response.status(200).send({ user, token });
    } catch (error) {
      console.error(error);
      if(error instanceof Yup.ValidationError) {
        return response.status(400).send({message: error.message, errors: error.errors});
      }

      return response.status(500).send({ message: 'internal error server' });
    }
  }
}

export { AuthController }
