const path = require('path')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.js')

const utils = require('./utils')

const { srcPath } = utils

module.exports = function (env) {
  return webpackMerge(baseConfig(env), {
    output: {
      filename: '[name].[chunkhash].js',
      path: path.join(__dirname, '../build')
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: '../index.html',
        title: 'Henson\'s Blog',
        template: srcPath('assets/template/index.html'),
        favicon: path.join(__dirname, '../favicon.ico')
      })
    ],
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
  })
}
