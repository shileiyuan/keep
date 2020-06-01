function buildConfig(env) {
  switch (env) {
    case 'development':
      return require('./scripts/webpack.dev.js')
    case 'production':
      return require('./scripts/webpack.prod.js')
    default:
    // can't arrive
  }
}

module.exports = buildConfig(process.env.NODE_ENV)
