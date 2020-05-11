import request from './request'
import { addUrlParams } from '@/utils/common'

const API_BASE = '/api'

const API = {
  get: {
    getUserInfo: '/user/getUserInfoByToken',
    queryUsers: '/user/list',

    fetchGallery: '/gallery/fetch',
    queryImages: '/gallery/queryImages',

    queryMatrixList: '/matrix/queryList'
  },
  post: {
    login: '/login',
    cleanGallery: '/gallery/cleanGallery'

  }
}

const methods = ['get', 'post']

const mix = (api, base = '') => {
  methods.forEach(method => {
    const obj = api[method]
    Object.entries(obj).forEach(([key, value]) => {
      obj[key] = (data, { urls = [], params = {} } = {}) => {
        const url = base + value + urls.join('/')
        switch (method) {
          case 'get':
            return request.get(url, { params: { ...data, ...params } })
          case 'post':
            return request.post(addUrlParams(url, params), data)
          default:
          // 不应该执行
        }
      }
    })
  })
}

mix(API, API_BASE)

export {
  API,
  API as default
}
