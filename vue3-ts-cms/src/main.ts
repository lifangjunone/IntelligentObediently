/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import register from './global'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css'
import 'normalize.css'
import '@/assets/css/index.less'
import '@/assets/font/iconfont.css'
// import '@/assets/font/iconfont.js'

import './service/axios_demo.ts'
import fjRequest from './service'
import {setupStore} from '@/store'

const app = createApp(App)
app.use(store)
// 插件方式引入同下效果一样
app.use(register)
// 自己手动注册
// register(app)
// 全局注册 element-plus
// app.use(ElementPlus)
// 进行注册动态路由
setupStore()
app.use(router)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.BASE_URL)
console.log(process.env.NODE_ENV)

interface DataType {
  data: any
  msg: string
  code: number
}

fjRequest
  .request<DataType>({
    url: 'http://1127.0.0.1:8000/api/backend_manage/test',
    method: 'GET',
    showLoading: false,
    interceptors: {
      requestInterceptor: (config) => {
        return config
      }
    }
  })
  .then((res) => {
    console.log(res)
  })

fjRequest
  .get<DataType>({
    url: 'http://127.0.0.1:8000/api/backend_manage/test',
    showLoading: false
  })
  .then((res) => {
    console.log(res)
  })
