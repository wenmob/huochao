import request from '@/utils/request'

/**
 * 获取更多产品 GetProductInfoListByCategory
 */
export function getProductInfoListByCategoryMore (params) {
  return request({
    url: '/api/APP/GetProductInfoListByCategoryMore',
    method: 'post',
    data: params
  })
}
