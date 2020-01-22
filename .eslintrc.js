// off: 0; warn: 1; error: 2
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true
  },
  extends: [
    'standard',
    'standard-react'
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'no-console': isProd ? 'error' : 'off',
    'no-debugger': isProd ? 'error' : 'off',
    'react/prop-types': 'off',
    'space-before-function-paren': 'off',
    'quote-props': ['error', 'consistent']
  }
}
