import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const newsApiKey = process.env.NEWS_API_KEY! as string;

export const newsApiService = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'Authorization': newsApiKey,
  }
});
