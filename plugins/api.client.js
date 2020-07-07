import { ENDPOINTS } from '~/api'

export const API = client => ({
  login: credentials => client.post(ENDPOINTS.USER.SIGN_IN, credentials),
  signUp: user => client.post(ENDPOINTS.USER.SIGN_UP, user),
  getCat: type => client.post(`${ENDPOINTS.CAAS}/${type}`),
  createSupplyOrder: ({ order }) => client.post(ENDPOINTS.SUPPLIES_ORDER.BASE, order),
  listSupplyOrders: (informer_id) => client.get(ENDPOINTS.SUPPLIES_ORDER.BASE + `${informer_id ? '?informer_id=' + encodeURIComponent(informer_id) : ''}`),
  acceptSupplyOrder: ({ order }) => client.post(ENDPOINTS.SUPPLIES_ORDER.ACCEPT, order),
  rejectSupplyOrder: ({ order }) => client.post(ENDPOINTS.SUPPLIES_ORDER.REJECT, order),
  listSupplyTypes: () => client.get(ENDPOINTS.SUPPLY_TYPES),
  listAreas: () => client.get(ENDPOINTS.AREAS),
  listOrgs: () => client.get(ENDPOINTS.ORGANIZATIONS)
})

export default ({ app: { $axios } }, inject) => {
  inject('api', API($axios))
}
