import { createRouter, createWebHistory } from 'vue-router'

const history = createWebHistory()
const home = () => import('../views/home.vue')
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: '/manage/userManage',
    children: [
      {
        name: 'userManage',
        path: '/manage/userManage',
        title: '用户管理',
        type: 0,
        icon: 'User',
        // component: {
        //   render: () => h(resolveComponent("router-view"))
        // },
        component: () => import(/* webpackChunkName: "institutionsManage" */ '../components/manage/userManage.vue')
      },
      // 0表示菜单
      {
        name: 'fileManage',
        path: '/manage/fileManage',
        title: '文件管理',
        type: 0,
        icon: 'Files',
        component: () => import(/* webpackChunkName: "institutionsManage" */ '../components/manage/fileManage.vue')
      }
    ]
  }
]
const router = createRouter({
  history,
  routes
})
export default router
