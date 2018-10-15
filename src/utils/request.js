import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
// import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
  withCredentials: false
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  const timestamp = (new Date()).valueOf()
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'timestamp': timestamp,
    'notsignature': 'b5654518a61c47e4b7cec263a2deba1c'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Toast.fail(error)
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    console.log(response)

    const res = response.data
    if (res.code !== 0) {
      Promise.reject(res.message)
    } else {
      return response.data
    }
  }, error => {
    console.log('err' + error)// for debug
    Toast.fail(error)
    return Promise.reject(error)
  })

export default service
