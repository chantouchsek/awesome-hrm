var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://awesome.hrm.test"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"wvEvTOuND35IJjyw1OG4k2XDYhDYD7kYSgsvMvrX"',
  BROADCAST_AUTH_ENDPOINT: '""',
  PUSHER_KEY: '""',
  PUSHER_CLUSTER: '"ap1"'
})
