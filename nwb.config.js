var path = require('path')

module.exports = {
  type: 'react-app',
  webpack: {
    aliases: {
      '~': path.resolve('src'),
      'assets': path.resolve('public/assets')
    }
  }
}
