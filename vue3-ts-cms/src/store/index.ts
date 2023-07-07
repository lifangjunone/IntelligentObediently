import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './system/system'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      entiresDepartment: [],
      entiresRole: [],
      entiresMenu: []
    }
  },
  mutations: {
    changeEntiresDepartment: (state, dep) => {
      state.entiresDepartment = dep
    },
    changeEntiresRole: (state, role) => {
      state.entiresRole = role
    },
    changeEntiresMenu: (state, menu) => {
      state.entiresMenu = menu
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1. 请求部门数据
      const departmentResult = await getPageListData('/departments', {
        offset: 0,
        size: 10000
      })
      const { list: departmentList } = departmentResult.data
      // 2. 角色数据

      const roleResult = await getPageListData('/roles', {
        offset: 0,
        size: 10000
      })
      // 解构起别名：  list: roleList 这个是起别名的语法，并不是指定类型，注意注意注意
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menus', {})
      const { list: menuList } = menuResult.data
      // 3. 保存数据
      commit('changeEntiresDepartment', departmentList)
      commit('changeEntiresRole', roleList)
      commit('changeEntiresMenu', menuList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
