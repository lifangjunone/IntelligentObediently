import fjRequest from '..'
import { IDataType } from '../type'
import { IAccount, ILoginResult, UserInfo } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/user/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  const res = fjRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
  return res
}

export function requestUserInfoById(id: number) {
  return fjRequest.get<IDataType<UserInfo>>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return fjRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id
  })
}
