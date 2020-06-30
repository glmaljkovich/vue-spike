import axios from 'axios'

export const state = () => ({
  areas: [],
  authUser: null,
  userEmail: null,
  orders: [],
  supplyTypes: []
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user["access_token"]
    state.userEmail = user.email
  },
  addOrder (state, order) {
    state.orders.push(order)
  },
  addOrders (state, orders) {
    state.orders = [...state.orders, ...orders]
  },
  addSupplyTypes (state, supplyTypes) {
    state.supplyTypes = [...state.supplyTypes, ...supplyTypes]
  },
  addAreas (state, areas) {
    state.areas = areas
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async loginAuth ({ commit }, data) {
      commit('SET_USER', data)
  },

  async logout ({ commit }) {
    // await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
