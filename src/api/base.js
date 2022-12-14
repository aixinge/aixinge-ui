import request from '@/utils/request'

const userApi = {
  // login
  Login: '/v1/login',
  RefreshToken: '/v1/refresh-token',
  AddUser: '/v1/user/create',
  DeleteUser: '/v1/user/delete', // 删除用户
  ChangePassword: '/v1/user/change-password',
  AssignRole: '/v1/user/assign-role', // 用户分配角色
  GetUserById: '/v1/user/get', // 根据ID获取用户
  GetUserList: '/v1/user/list', // 获取用户列表
  GetUserPageList: '/v1/user/page', // 分页获取用户列表
  GetUserRoleListById: '/v1/user/selected-roles', // 根据ID获取用户已分配角色列表
  UpdateUserInfo: '/v1/user/update' // 更新用户信息
}

export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function addUser (parameter) {
  return request({
    url: userApi.AddUser,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: parameter
  })
}

export function refreshToken (parameter) {
  return request({
    url: userApi.RefreshToken,
    data: parameter,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function deleteUser (parameter) {
  return request({
    url: userApi.DeleteUser,
    data: parameter,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function updateUserInfo (parameter) {
  return request({
    url: userApi.UpdateUserInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: parameter
  })
}

export function changePassword (parameter) {
  return request({
    url: userApi.ChangePassword,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function assignRole (parameter) {
  return request({
    url: userApi.AssignRole,
    method: 'post',
    data: parameter
  })
}

export function getUserById (parameter) {
  return request({
    url: userApi.GetUserById,
    method: 'post',
    data: parameter
  })
}

export function getUserList (parameter) {
  return request({
    url: userApi.GetUserList,
    method: 'post',
    data: parameter
  })
}

export function getUserPageList (parameter) {
  return request({
    url: userApi.GetUserPageList,
    method: 'post',
    data: parameter
  })
}

export function getUserRoleListById (parameter) {
  return request({
    url: userApi.GetUserRoleListById,
    method: 'post',
    data: parameter
  })
}
