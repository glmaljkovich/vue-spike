import axios from 'axios';
import config from './config';

const APIConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;
const client = axios.create({
  baseURL: `${APIConfig.host}:${APIConfig.port}`,
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
  }
})

const ENDPOINTS = {
  CAAS: "https://cataas.com/cat",
  SUPPLIES_ORDER: '/supplies-order',
  USER: {
    SIGN_IN: '/user/signin',
    SIGN_UP: '/user/signup',
  }
}

export const API = {
  login: (credentials) => client.post(ENDPOINTS.USER.SIGN_IN, credentials),
  signUp: (user) => client.post(ENDPOINTS.USER.SIGN_UP, user),
  getCat: (type) => client.post(`${ENDPOINTS.CAAS}/${type}`),
  createSupplyOrder: ({order, token}) => client.post(ENDPOINTS.SUPPLIES_ORDER, order, {
    headers: {
       Authorization: "Bearer " + token
    }
  }),
  listSupplyOrders: (token) => client.get(ENDPOINTS.SUPPLIES_ORDER, { token })
}
