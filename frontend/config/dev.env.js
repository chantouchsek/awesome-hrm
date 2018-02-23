var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_LOCATION: '"http://127.0.0.1:8000"',
  API_CLIENT_ID: '"2"',
  API_CLIENT_SECRET: '"CqAwmoMAHjU8JUzXa55vmmWY8JXlKUGb1LF0Uv7P"',
  BROADCAST_AUTH_ENDPOINT: '""',
  PUSHER_KEY: '""',
  PUSHER_CLUSTER: '"ap1"'
})
