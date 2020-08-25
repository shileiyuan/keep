const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { srcPath } = require('./utils')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  entry: srcPath('index.js'),

  // 默认是 ['.wasm', '.mjs', '.js', '.json']，
  // 没有jsx，要自己覆盖掉默认值
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': srcPath()
    }
    // modules: [
    //   nodeModulesPath(),
    //   srcPath()
    // ]
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [srcPath()],
        loader: 'babel-loader'
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(mp3|wav)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: "Henson's Blog",
      template: srcPath('assets/template/index.html'),
      favicon: srcPath('assets/images/favicon.ico')
    })
  ]
}
