import service from './index'
// 获取所有文件列表
export const getFilesList = (params) => service.post('/fileUploadAndDownload/getFileList', params)
// 创建用户
export const createUser = (params) => service.post('/user/createUser', params)
// 编辑用户
export const editUser = (params) => service.put('/user/setUserInfo', params)
// 删除用户
export const deleteUser = (params) => service.delete('/user/deleteUser', params)
