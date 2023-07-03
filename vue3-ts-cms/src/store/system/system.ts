import { IRootState } from '../type'
import { ISystemState } from './typs'
import { Module } from 'vuex'

const systemModule: Module<ISystemState, IRootState> = {
  state() {
    return {
      userList: [],
      userCount: 0
    }
  }
}

export default systemModule
