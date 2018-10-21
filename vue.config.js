process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const path = require('path')

    config.resolve.alias
      .delete('@')
      .set('#app', path.resolve(__dirname, './example'))
      .set('#lib', path.resolve(__dirname, './lib'))
  },
}
