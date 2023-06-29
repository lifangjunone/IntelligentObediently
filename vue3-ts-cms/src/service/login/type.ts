export interface IAccount {
  name: string
  passwored: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface UserInfo {
  id: number
  name: string
  realname: string
  cellphone: string
  enable: number
  createAt: string
  updateAt: string
  role: Role
  department: Department
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface Department {
  id: number
  name: string
  parentId: any
  createAt: string
  updateAt: string
  leader: string
}

export interface IDataType<T = any> {
  msg: string
  code: number
  data: T
}
