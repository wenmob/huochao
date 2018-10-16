import $ from 'jquery'
import qs from 'qs'
import { Toast } from 'vant'
// import { getToken } from '@/utils/auth'
// create an axios instance
const service = ({url, method, data}) => {
  return new Promise((resolve, reject) => {
    const timestamp = (new Date()).valueOf()
    $.ajax({
      type: method,
      headers: { 'timestamp': timestamp, 'notsignature': 'b5654518a61c47e4b7cec263a2deba1c' },
      url: process.env.BASE_API + url,
      data: data,
      success: (data, status) => {
        if (status === 200) {
          console.log(data)
          resolve(data)
        } else {
          reject(data.message)
        }
      },
      error: (err) => {
        reject(err)
        Toast.fail(err)
      }
    })
  })
}

export default service
