import { IRootState } from '../type'
import { ISystemState } from './typs'
import { Module } from 'vuex'
import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        const res = (state as any)[`${pageName.toLowerCase()}List`]

        return res
      }
    },
    pageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName.toLowerCase()}Count`]
      }
    }
  },

  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, rolerCount: number) {
      state.roleCount = rolerCount
    }
  },
  actions: {
    async getPageListAction({ commit }, playload) {
      const pageName = playload.requestInfo.pageName
      const pageUrl = playload.requestInfo.pageUrl
      const queryInfo = playload.requestInfo.queryInfo
      const pageInfo = playload.requestInfo.pageInfo
      console.log('==========', playload)

      const pageResult = await getPageListData(pageUrl, {
        ...queryInfo,
        ...pageInfo
      })
      const { list, totalCount } = pageResult.data
      console.log('xxxx', pageName)

      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
    }
  }
}

export default systemModule
