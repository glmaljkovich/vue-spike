
export const state = () => ({
  areas: [],
  orders: [],
  supplyTypes: [],
  organizations: []
})

export const mutations = {
  addOrder (state, order) {
    state.orders.push(order)
  },
  addOrders (state, orders) {
    state.orders = orders
  },
  addSupplyTypes (state, supplyTypes) {
    state.supplyTypes = supplyTypes
  },
  addAreas (state, areas) {
    state.areas = areas
  },
  addOrgs (state, organizations) {
    state.organizations = organizations
  },
  updateOrder ({ orders }, { id, status }) {
    const leorder = orders.find(order => order.id === id)
    leorder.status = status
  },
  removeOrder (state, order) {
    state.orders = state.orders.filter(ord => ord.id !== order.id)
  }
}

export const actions = {

}
