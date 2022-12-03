import { Address } from '../entities/Address';
import { database } from '../database';

export const AddressRepository = database.getRepository(Address);
