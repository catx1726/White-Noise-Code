import { getToken } from '@/utils/permission/auth'
import { checkResCodeAndBackMsg } from '@/utils/permission/error_handle'

export default function({ $axios, redirect, app, store }) {
  $axios.onRequest((config) => {
    app.$Loading({ show: true })
    // DES 发起请求前校验是否存在token，不存在就跳转登录
    const token = getToken()

    if (!token) {
      store.dispatch('user/logout')
      return redirect('/login')
    }
    config.headers.Authorization = 'Bearer ' + getToken()
    // console.log('Making request to ' + config.url)
  })

  // response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use((response) => {
    app.$LoadingHide()
    const check = checkResCodeAndBackMsg(response.data)
    if (!check.state) {
      app.$Message({ show: true, message: check.message })
      response.data = { ErrorCode: 9, state: false }
      return response
    }
    return response
  })

  $axios.onError((error) => {
    app.$LoadingHide()
    // console.log('axios onError:', app, error, error.response)
    if (error.response.status === 404) {
      return {
        statusCode: 404,
        message: error.response.data.error_description || '404 server error!'
      }
    }
    if (error.response.status === 500) {
      return {
        statusCode: 500,
        message: error.response.data.error_description || '500 server error!'
      }
    }

    app.$Message({ show: true, message: error.response.data.error_description })
    return error
  })
}
