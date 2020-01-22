const path = require('path')

const srcPath = extarPath => {
  const finalPath = extarPath ? `/${extarPath}` : ''
  return path.join(__dirname, `../src${finalPath}`)
}

module.exports = {
  srcPath
}
