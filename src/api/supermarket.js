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
