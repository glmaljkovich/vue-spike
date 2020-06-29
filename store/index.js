import axios from 'axios'

export const state = () => ({
  authUser: null,
  orders: []
})

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  },
  addOrder ({ orders }, order) {
    orders.push(order)
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
      commit('SET_USER', data["access_token"])
  },

  async logout ({ commit }) {
    // await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
