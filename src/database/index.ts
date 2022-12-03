import { DataSource } from "typeorm"
import dotEnv from 'dotenv';

dotEnv.config();

export const database = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../entities/*.ts`, `${__dirname}/../entities/*.js`],
  migrations: [`${__dirname}/migrations/*.ts`, `${__dirname}/../migrations/*.js`],
  migrationsTableName: 'migrations',
});
