import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount, UserInfo } from '@/service/login/type'
import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menu'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string): void {
      state.token = token
    },
    changeUserInfo(state, userInfo: UserInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 用户菜单和路由注册映射
      const routers = mapMenusToRoutes(userMenus)
      routers.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    // 账号登录
    async accountLoginAction({ commit }, playload: IAccount) {
      console.log('执行accountLoginAction', playload)
      // 1, 登录获取 token
      const loginResult = await accountLoginRequest(playload)
      // 不能在action中修改state中的数据，修改state数据唯一的方式是通过 mutations
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 2, 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // 3, 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 4, 跳转到主页
      router.push('/main')
    },
    // 刷新时从window cache 中重新加载数据到 vuex
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    // 手机号登录
    phoneLoginAction({ commit }, playload: any) {
      console.log('执行phoneLoginAction', playload)
    }
  }
}

export default loginModule
