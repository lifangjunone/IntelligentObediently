import service from './index'
// 接口都改为按需引入的方式
// 登录
export const login = (params) => service.post('/base/login', params)
// 获取用户列表
export const getUserList = (params) => service.post('/user/getUserList', params)
// 创建用户
export const createUser = (params) => service.post('/user/createUser', params)
// 编辑用户
export const editUser = (params) => service.put('/user/setUserInfo', params)
// 删除用户
export const deleteUser = (params) => service.delete('/user/deleteUser', params)
