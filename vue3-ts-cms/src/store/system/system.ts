import { IRootState } from '../type'
import { ISystemState } from './typs'
import { Module } from 'vuex'
import { getPageListData } from '@/service/main/system/system'
import { pl } from 'element-plus/es/locale'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    }
  },
  actions: {
    async getPageListAction({ commit }, playload) {
      const pageResult = await getPageListData(
        playload.pageUrl,
        playload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      console.log(list, totalCount)
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
