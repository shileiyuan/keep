const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const config = {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, '../build')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}

module.exports = webpackMerge(baseConfig, config)
