import service from '@/utils/service'

// 登录
export const login = (data) => service.post('/login', data)

// 退出登录
export const logout = (data) => service.post('/logout', data)

// 获取用户信息
export const getUserInfo = (data) => service.post('/userInfo', data)

// 注册
export const register = (data) => service.post('/register', data)

// 获取验证码
export const getCaptcha = (data) => service.post('/captcha', data)

//  修改密码
export const modifyPassword = (data) => service.post('/modifyPassword', data)
