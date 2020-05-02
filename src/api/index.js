import axios from 'axios';
import config from './config';

const APIConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;
export const API = axios.create({
  baseURL: `${APIConfig.host}:${APIConfig.port}`,
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
  }
})
