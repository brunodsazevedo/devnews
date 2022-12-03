import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { database } from './database';
import { routes } from './routes';

dotenv.config();

database.initialize();

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server is running at https://localhost:${port}`));
