import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { database } from './database';
import { routes } from './routes';

import swaggerDocs from './swagger.json'; 

dotenv.config();

database.initialize();

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => console.log(`Server is running at https://localhost:${port}`));
