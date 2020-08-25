const path = require('path')

const srcPath = extarPath => {
  const finalPath = extarPath ? `/${extarPath}` : ''
  return path.join(__dirname, `../src${finalPath}`)
}

const nodeModulesPath = () => path.join(__dirname, '../node_modules')

module.exports = {
  srcPath,
  nodeModulesPath
}
