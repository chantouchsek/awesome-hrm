/* ============
 * Bootstrap File
 * ============
 *
 * This will configure and bootstrap the application.
 */

/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue'

/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios'
import routes from '@/router'
import VueRouter from 'vue-router'

import BootstrapVue from 'bootstrap-vue'

/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import { sync } from 'vuex-router-sync'
import store from '@/store'

store.dispatch('auth/check')

Vue.config.debug = process.env.NODE_ENV !== 'production'

Axios.defaults.baseURL = process.env.API_LOCATION
Axios.defaults.headers.common.Accept = 'application/json'

// Bind Axios to Vue.
Vue.$http = Axios
Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})

store.dispatch('auth/check')

/* ===============
* Vues Router
* ================
*
* The official Router for Vue.js. It deeply integrates with Vue.js core to make building Singple Page Application with Vue.js a breeze.
*
* http://router.vuejs.org/en/inde.html
 */

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 500)
    })
  },
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    next({
      name: 'LoginPage'
    })
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})

sync(store, router)

Vue.router = router

Vue.use(BootstrapVue)

export default {
  router
}
