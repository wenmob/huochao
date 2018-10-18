import $ from 'jquery'
import { Toast } from 'vant'
// import { getToken } from '@/utils/auth'
// create an axios instance
const service = ({url, method, data}) => {
  return new Promise((resolve, reject) => {
    const timestamp = (new Date()).valueOf()
    $.ajax({
      type: method,
      headers: { 'timestamp': timestamp, 'notsignature': 'b5654518a61c47e4b7cec263a2deba1c' },
      url: url,
      data: data,
      success: (data, status) => {
        if (data.code === 12000) {
          resolve(data)
        } else {
          Toast.fail(data.message)
          reject(data.message)
        }
      },
      error: (err) => {
        Toast.fail(err)
        reject(err)
      }
    })
  })
}

export default service
