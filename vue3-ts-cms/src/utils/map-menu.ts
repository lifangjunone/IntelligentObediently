import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any): RouteRecordRaw[] {
  const routers: RouteRecordRaw[] = []
  const allRouters: RouteRecordRaw[] = []

  // 获取所有路由
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1])
    allRouters.push(route.default)
  })
  // 根据后台返回的菜单动态添加路由
  const _recurseGetRoute = (menus: any) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRouters.find((route) => {
          if (route.path === menu.url) {
            routers.push(route)
          }
        })
        if (route) {
          routers.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routers
}
