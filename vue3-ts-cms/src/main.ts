import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import register from './global'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

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

fjRequest.request({
  url: 'http://192.168.137.228:8000/api/backend_manage/test',
  method: 'GET'
})
