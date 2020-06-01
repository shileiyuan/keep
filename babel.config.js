module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react'
  ],
  plugins: ['syntax-dynamic-import', '@babel/plugin-proposal-class-properties', 'ramda']
}
