import { IRootState } from '../type'
import { ISystemState } from './typs'
import { Module } from 'vuex'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      shopList: [],
      shopCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
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
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeShopList(state, shopList: any[]) {
      state.shopList = shopList
    },
    changeShopCount(state, shopCount: number) {
      state.shopCount = shopCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    }
  },
  actions: {
    // 获取页面数据
    async getPageListAction({ commit }, payload) {
      const pageName = payload.requestInfo.pageName
      const pageUrl = payload.requestInfo.pageUrl
      const queryInfo = payload.requestInfo?.queryInfo
      const pageInfo = payload.requestInfo?.pageInfo

      const pageResult = await getPageListData(pageUrl, {
        ...queryInfo,
        ...pageInfo
      })
      const { list, totalCount } = pageResult.data

      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
    },
    // 删除页面数据
    async deletePageDataAction({ dispatch }, payload: any) {
      const id = payload.id
      const pageName = payload.requestInfo.pageName
      const pageUrl = `/${pageName.toLowerCase()}/${id}`
      // 调用删除请求
      await deletePageData(pageUrl)
      // 重新请求最新的数据
      dispatch('getPageListAction', payload)
    },
    // 创建页面数据
    async createPageDataAction({ dispatch }, data: any) {
      const { payload, requestInfo } = data
      const pageName = requestInfo.pageName
      const pageUrl = `${pageName.toLowerCase()}`
      await createPageData(pageUrl, payload)
      // 重新请求最新的数据
      dispatch('getPageListAction', data)
    },
    // 编辑页面数据
    async editPageDataAction({ dispatch }, data: any) {
      const { payload, requestInfo, id } = data
      const pageName = requestInfo.pageName
      const pageUrl = `${pageName.toLowerCase()}/${id}`
      await editPageData(pageUrl, payload)
      // 重新请求最新的数据
    }
  }
}

export default systemModule
