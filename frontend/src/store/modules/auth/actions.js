import Vue from 'vue'
import * as types from './mutation-types'

export const check = ({ commit }) => {
  commit(types.CHECK)
}

export const login = ({ commit }, payload) => {
  Vue.$http.post('oauth/token', {
    username: payload.username,
    password: payload.password,
    client_id: process.env.API_CLIENT_ID,
    client_secret: process.env.API_CLIENT_SECRET,
    grant_type: 'password',
    scope: ''
  })
    .then((data) => {
      console.log(data)
      // commit(types.LOGIN, 'myRandomAccessToken')

      Vue.router.push({
        name: 'Home'
      })
    })
}

export const logout = ({ commit }) => {
  commit(types.LOGOUT)
}

export default {
  check,
  login,
  logout
}
