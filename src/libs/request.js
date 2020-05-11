import axios from 'axios'
import { message } from 'antd'
import CONFIG from './config'
import store from '@/models'

const instance = axios.create({
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

function configRequest(config) {
  const token = localStorage.getItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)
  if (config.url !== '/login' && token) {
    config.headers[CONFIG.AUTH_TOKEN_HEADER] = token
  }
  return config
}

instance.interceptors.request.use(configRequest)
instance.interceptors.response.use(
  res => res.data,
  error => {
    const { status } = error.response
    switch (status) {
      case 403:
        // localStorage.removeItem(CONFIG.AUTH_TOKEN_STORAGE_KEY)
        // window.location.href = '/'
        store.dispatch({ type: 'login/logout' })
        break
      default:
        message.error(status)
    }
  }
)

export default instance
