import request from '@/utils/request'

/**
 * 获取顶部广告菜单 GetProductInfoListByCategory
 */
export function getProductInfoDetails (params) {
  return request({
    url: '/api/APP/GetProductInfoDetails',
    method: 'post',
    data: params
  })
}

/**
 * 获取同类产品 GetProductInfoListByCategory
 */
export function getProductInfoListByCategory (params) {
  return request({
    url: '/api/APP/GetProductInfoListByCategory',
    method: 'post',
    data: params
  })
}
