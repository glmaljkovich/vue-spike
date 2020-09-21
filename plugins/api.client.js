import { ENDPOINTS } from '~/api'

export const API = client => ({
  login: credentials => client.post(ENDPOINTS.USER.SIGN_IN, credentials),
  signUp: user => client.post(ENDPOINTS.USER.SIGN_UP, user),
  getCat: type => client.post(`${ENDPOINTS.CAAS}/${type}`),
  createSupplyOrder: ({ order }) => client.post(ENDPOINTS.SUPPLIES_ORDER.BASE, order),
  listSupplyOrders: (informer_id) => client.get(ENDPOINTS.SUPPLIES_ORDER.BASE + `${informer_id ? '?informer_id=' + encodeURIComponent(informer_id) : ''}`),
  acceptSupplyOrder: ({ order }) => client.post(
    ENDPOINTS.SUPPLIES_ORDER.ACCEPT.replace('{suppliesOrderId}', order.supplies_order_id),
    { organization_id: order.organization_id }
  ),
  cancelSupplyOrder: ({ orderId }) => client.delete(ENDPOINTS.SUPPLIES_ORDER.BASE + `/${orderId}`),
  rejectSupplyOrder: ({ order }) => client.post(
    ENDPOINTS.SUPPLIES_ORDER.REJECT.replace('{suppliesOrderId}', order.supplies_order_id),
    { organization_id: order.organization_id }
  ),
  listSupplyTypes: () => client.get(ENDPOINTS.SUPPLY_TYPES),
  listAreas: () => client.get(ENDPOINTS.AREAS),
  listOrgs: () => client.get(ENDPOINTS.ORGANIZATIONS)
})

export default ({ app: { $axios } }, inject) => {
  inject('api', API($axios))
}
