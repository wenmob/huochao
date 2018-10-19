import request from '@/utils/request'

/**
 * 获取资讯的信息 GetNewsDetails
 */
export function getNewsDetails (params) {
  return request({
    url: '/api/APP/GetNewsDetails',
    method: 'post',
    data: params
  })
}

/**
 * 获取资讯列表 GetNewsList
 */
export function getNewsList (params) {
  return request({
    url: '/api/APP/GetNewsList',
    method: 'post',
    data: params
  })
}

/**
 * 获取资讯列表 GetNewsList
 */
export function saveNewsAccessRecord (params) {
  return request({
    url: '/api/APP/SaveNewsAccessRecord',
    method: 'post',
    data: params
  })
}
