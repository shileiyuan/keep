function buildConfig(env) {
  switch (env) {
    case 'dev':
      return require('./scripts/webpack.dev.js')('development')
    case 'mock':
      return require('./scripts/webpack.dev.js')('mock')
    case 'prod':
      return require('./scripts/webpack.prod.js')('production')
    default:
    // can't arrive
  }
}

module.exports = buildConfig
