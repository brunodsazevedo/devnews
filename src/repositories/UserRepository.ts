import { User } from '../entities/User';
import { database } from '../database';

export const UserRepository = database.getRepository(User);
