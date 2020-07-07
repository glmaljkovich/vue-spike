import config from './config'

export const APIConfig = process.env.NODE_ENV === 'production' ? config.production : config.development

export const ENDPOINTS = {
  AREAS: '/areas',
  CAAS: 'https://cataas.com/cat',
  ORGANIZATIONS: '/organization/group-by-supply-type',
  SUPPLIES_ORDER: {
    BASE: '/supplies-order',
    ACCEPT: '/supplies-order/accept',
    REJECT: '/supplies-order/reject'
  },
  SUPPLY_TYPES: '/supplies-order/supply-types',
  USER: {
    PROFILE: '/user/profile',
    SIGN_IN: '/user/signin',
    SIGN_UP: '/user/signup'
  }
}
