import Vue from 'vue'
import Axios from 'axios'

Vue.config.debug = process.env.NODE_ENV !== 'production'

Axios.defaults.baseURL = 'http://api.awesome-hrm.com'

Axios.defaults.headers.commone.Accept = 'application/json'

Vue.$http = Axios

Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})
