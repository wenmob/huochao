import request from '@/utils/request'

/**
 * 获取我的钱包 GetUserWallet
 */
export function getUserWallet (params) {
  return request({
    url: '/api/APP/GetUserWallet',
    method: 'post',
    data: params
  })
}
