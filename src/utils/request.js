import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      const RT = storage.get(REFRESH_TOKEN)
      if (RT) {
        store.dispatch('RefreshAT', RT)
          .then(() => {
            notification.info({
              message: 'RefreshToken Success',
              description: 'Unauthorized Refreshed Please Try Again'
            })
            const originalRequest = error.config
            return request(originalRequest)
        }).catch(err => {
          notification.error({
            message: 'Unauthorized',
            description: ((err.response || {}).data || {}).message || 'Authorization verification failed'
          })
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  if (config.requestType === 'MOCK_URL') {
    config.baseURL = process.env.VUE_APP_MOCK_BASE_URL
  } else {
    config.baseURL = process.env.VUE_APP_API_BASE_URL
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  const data = response.data || {}
  if (data.code === 1 && data.msg.indexOf('Token is expired') !== -1) {
    const RT = storage.get(REFRESH_TOKEN)

    if (RT) {
      return store.dispatch('RefreshAT', RT)
        .then((res) => {
          const originalRequest = response.config
          return request(originalRequest)
        }).catch(err => {
        notification.error({
          message: 'Unauthorized',
          description: ((err.response || {}).data || {}).message || 'Authorization verification failed'
        })
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      })
    }
  }
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
