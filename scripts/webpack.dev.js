const webpackMerge = require('webpack-merge').merge
const baseConfig = require('./webpack.base.js')

const HOST = '0.0.0.0'
const PORT = 2333

const config = {
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    host: HOST,
    port: PORT,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        pathRewrite: { '^/api': '' }
      },
      '/images': {
        target: 'http://127.0.0.1:7001'
      }
    }
  }
}

module.exports = webpackMerge(baseConfig, config)
