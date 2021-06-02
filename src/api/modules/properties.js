import service from '@/utils/service'
import { paramsSerializer } from '@/utils/core'

// 获取配置列表
export const getList = (data) => service.get('/config/list', data, {
  paramsSerializer (params) {
    return paramsSerializer(params)
  }
})

// 获取配置详情
export const getDetail = (data) => service.get('/config/detail', data)

// 新增/修改配置
export const update = (data) => service.post('/config/update', data)

// 删除配置
export const remove = (data) => service.post('/config/remove', data)
