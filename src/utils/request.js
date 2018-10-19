import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from '@/utils/auth'
import queryString from 'querystring'
// create an axios instance

const service = axios.create({
  // baseURL: BASE_API, // api的base_url
  baseURL: process.env.BASE_API,
  timeout: 1000 * 10,
  // withCredentials:true
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(config);
    let data = config.data || {}
    // NProgress.start();
    // Do something before request is sent
    config.headers = {
      // "content-type": "from-data",
      ...config.headers,
      timestamp: new Date() - 0,
      notsignature: 'b5654518a61c47e4b7cec263a2deba1c'
    }
    // console.log(config);
    if (!config.noToken) {
      const token = getToken()
      // console.log("token", token);
      data.UserKey = token
    }

    config.data = queryString.stringify(data)
    // console.log("异步请求:", config);
    return config
  },
  error => {
    // NProgress.done();
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  ({ data, config }) => {
    // NProgress.done();

    if (data.code !== 12000) {
      // Toast.fail(data.message)
      return Promise.reject(data)
    }

    return data
  },
  (error, b, c) => {
    console.log(error)
    // console.log("err" + error); // for debug
    // NProgress.done();
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export default service

// const service = ({ url, method, data }) => {
//   return new Promise((resolve, reject) => {
//     const timestamp = new Date().valueOf();
//     $.ajax({
//       type: method,
//       headers: {
//         timestamp: timestamp,
//         notsignature: "b5654518a61c47e4b7cec263a2deba1c"
//       },
//       url: url,
//       data: data,
//       success: (data, status) => {
//         if (data.code === 12000) {
//           resolve(data);
//         } else {
//           Toast.fail(data.message);
//           reject(data.message);
//         }
//       },
//       error: err => {
//         Toast.fail(err);
//         reject(err);
//       }
//     });
//   });
// };

// export default service;
