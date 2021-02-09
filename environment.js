
let localEnv = {}

const env = {
  apiUrl: 'https://randomlyapi.symphony.is/api/'
}


try {
  localEnv = require('./environment.local.js').default
} catch (error) {
  //
}

export default {
  ...env,
  ...localEnv
}