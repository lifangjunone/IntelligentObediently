import { ILoginState } from './login/type'
import { ISystemState } from './system/typs'
import { IDashboardState } from './analysis/type'

export interface IRootState {
  entiresDepartment: any[]
  entiresRole: any[]
  entiresMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
