const { srcPath } = require('./utils')
const webpack = require('webpack')

module.exports = function (env) {
  const config = {
    mode: env === 'production' ? env : 'development',

    entry: srcPath('index.js'),

    // 默认是 ['.wasm', '.mjs', '.js', '.json']，
    // 没有jsx，要自己覆盖掉默认值
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': srcPath()
      }
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
          // include: [srcPath()],
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
                javascriptEnabled: true
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
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env) })
    ]
  }

  return config
}
