import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import register from './global'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/el-loading.css'

import './service/axios_demo.ts'
import fjRequest from './service'

const app = createApp(App)
app.use(router)
app.use(store)
// 插件方式引入同下效果一样
app.use(register)
// 自己手动注册
// register(app)
// 全局注册 element-plus
// app.use(ElementPlus)
app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)

interface DataType {
  data: any
  msg: string
  code: number
}

fjRequest
  .request<DataType>({
    url: 'http://192.168.137.228:8000/api/backend_manage/test',
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
    url: 'http://192.168.137.228:8000/api/backend_manage/test',
    showLoading: true
  })
  .then((res) => {
    console.log(res)
  })
