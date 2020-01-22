import moment from 'moment'

// 给url添加查询参数：普通版
export const addUrlParams = (url, params) => {
  const keys = Object.keys(params)

  if (keys.length === 0) return url

  const paramStr = keys
    .filter(key => params[key] !== undefined)
    .map(key => `${key}=${params[key]}`)
    .join('&')

  return `${url}${url.includes('?') ? '' : '?'}${paramStr}`
}

export const parseTime = d => moment(d).format('YYYY-MM-DD HH:mm:ss')

export const debounce = (fn, delay, scope) => {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(scope, args)
    }, delay)
  }
}
