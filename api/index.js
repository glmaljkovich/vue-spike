import config from './config'

export const APIConfig = process.env.NODE_ENV === 'production' ? config.production : config.development

export const ENDPOINTS = {
  AREAS: '/areas',
  CAAS: 'https://cataas.com/cat',
  ORGANIZATIONS: '/organizations/group-by-supply-type',
  SUPPLIES_ORDER: {
    BASE: '/supplies-orders',
    ACCEPT: '/supplies-orders/{suppliesOrderId}/accept',
    REJECT: '/supplies-orders/{suppliesOrderId}/reject'
  },
  SUPPLY_TYPES: '/supplies-orders/supply-types',
  USER: {
    PROFILE: '/user/profile',
    SIGN_IN: '/user/signin',
    SIGN_UP: '/user/signup'
  }
}
