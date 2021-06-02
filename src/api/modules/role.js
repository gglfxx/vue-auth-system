import service from '@/utils/service'

// 权限列表
export const getRoutes = (data) => service.get('/role/getRoutes', data)

// 角色列表
export const getRoles = (data) => service.get('/role/getRoles', data)

// 新增角色
export const addRole = (data) => service.post('/role/addRole', data)

// 删除角色
export const deleteRole = (data) => service.post('/role/deleteRole', data)

// 更新角色
export const updateRole = (data) => service.post('/role/updateRole', data)
