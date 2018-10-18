import request from '@/utils/request'

/**
 * 获取我的积分 GetUserIntegral
 */
export function getUserIntegral (params) {
  return request({
    url: '/api/APP/GetUserIntegral',
    method: 'post',
    data: params
  })
}
