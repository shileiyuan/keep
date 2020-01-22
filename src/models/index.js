import { init } from '@rematch/core'

const context = require.context('./', false, /\.js$/)
const keys = context.keys().filter(path => path !== './index.js')

const models = {}

keys.forEach(path => {
  const model = context(path)
  const name = path.match(/\.\/(\w+)\.js/)[1]
  models[name] = model.default
})
export default init({
  models
})
