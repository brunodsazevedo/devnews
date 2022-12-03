import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const newsApiService = axios.create({
  baseURL: 'https://newsapi.org',
  headers: {
    'Authorization': process.env.NEWS_API_KEY,
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export { newsApiService }
