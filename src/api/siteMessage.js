import request from '@/utils/request'

/**
 * 获取我的钱包 GetUserWallet
 */
export function getPushMsgDetails (params) {
  return request({
    url: '/api/APP/GetPushMsgDetails',
    method: 'post',
    data: params
  })
}
