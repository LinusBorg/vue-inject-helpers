process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const path = require('path')

    config.resolve.alias.delete('@')
    config.resolve.alias.set('#app', path.resolve(__dirname, './example'))
    config.resolve.alias.set('#lib', path.resolve(__dirname, './lib'))

    if (process.env.V_APP_ANALYZE) {
      const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugin('bundleAnalyzer').use(Analyzer, [
        {
          analyzerMode: 'static',
        },
      ])
    }
  },
}
