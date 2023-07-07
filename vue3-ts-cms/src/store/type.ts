import { ILoginState } from './login/type'
import { ISystemState } from './system/typs'

export interface IRootState {
  entiresDepartment: any[]
  entiresRole: any[]
  entiresMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
