import axios from 'axios'
import CONFIG from './config'

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
instance.interceptors.response.use(res => res.data)

export default instance
