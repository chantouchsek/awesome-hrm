import Vue from 'vue'
import * as types from './mutation-types'
import AuthProxy from '@/proxies/AuthProxy'
import AuthTransformer from '@/transformers/AuthTransformer'

const proxy = new AuthProxy()

export const check = ({ commit }) => {
  commit(types.CHECK)
}

export const login = ({ commit }, payload) => {
  proxy.login(payload).then()
    .then((response) => {
      commit(types.LOGIN, AuthTransformer.fetch(response))

      Vue.router.push({
        name: 'Home'
      })
    })
    .catch(() => {
      alert('Your email or password incorrect.')
    })
}

export const logout = ({ commit }) => {
  commit(types.LOGOUT)

  Vue.router.push({
    name: 'login.index'
  })
}

export default {
  check,
  login,
  logout
}
