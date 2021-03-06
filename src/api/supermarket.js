import request from '@/utils/request'

/**
 * 获取顶部广告菜单
 */
export function getAdvertisementListByPosition (params) {
  return request({
    url: '/api/APP/GetAdvertisementListByPosition',
    method: 'post',
    data: params
  })
}
/**
 * 获取今日下款
 */
export function getTodayPayProduct (params) {
  return request({
    url: '/api/APP/GetTodayPayProduct',
    method: 'post',
    data: params
  })
}
/**
 * 获取产品类别和产品
 */
export function getCatAndProJsonLit (params) {
  return request({
    url: '/api/APP/GetCatAndProJsonLit',
    method: 'post',
    data: params
  })
}
