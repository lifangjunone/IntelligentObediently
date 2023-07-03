import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
            if (!firstMenu) {
              firstMenu = menu
            }
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

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const res = pathMapToMenu(menu.children ?? [], currentPath)
      if (res) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: res.name })
        return res
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export { firstMenu }
