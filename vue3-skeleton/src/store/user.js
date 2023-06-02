// 管理状态的模块
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const routerBreadcrumb = ref([])
  const setRouterBreadcrumb = (val) => {
    routerBreadcrumb.value = val
  }
  return {
    routerBreadcrumb,
    setRouterBreadcrumb
  }
  // state: () => {
  //   return {
  //     count: 0,
  //     routerBreadcrumb: {
  //       title: '用户管理'
  //     }
  //   }
  // },
  // getters: { // 主要作用类似于computed 数据修饰并且有缓存,可互相调用getters内部值
  //   doubleCount() {
  //     return this.count * 2
  //   }
  // },
  // actions: { // 支持同步异步 支持async await修饰
  //   // updatecount(val) {
  //   //   this.count = val
  //   // }
  //   updateRouterBreadcrumb(val) {
  //     this.routerBreadcrumb = val
  //   }
  // }
})
