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
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menu'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
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
      // 请求用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    // 账号登录
    async accountLoginAction({ commit, dispatch }, playload: IAccount) {
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
      // 发送初始化请求，获取初始化的一些数据
      // 这样写认为是调用模块自己的 actions 中的方法，不正确
      // dispatch('getInitialDataAction')
      // 这样写才是调用root跟的 actions 中的方法
      dispatch('getInitialDataAction', null, { root: true })
      // 4, 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 5, 跳转到主页
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
