var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://api.awesome-hrm.test"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"dBDtGNn1krLqmtzRNYJt9CndchrazRFChTGcvZgH"',
  BROADCAST_AUTH_ENDPOINT: '""',
  PUSHER_KEY: '""',
  PUSHER_CLUSTER: '"ap1"'
})
