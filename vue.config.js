process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
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
