import request from '@/utils/request'

/**
 * 获取顶部广告菜单 GetProductInfoListByCategory
 */
export function getProductInfoListByActivityMore (params) {
  return request({
    url: '/api/APP/GetProductInfoListByActivityMore',
    method: 'post',
    data: params
  })
}
