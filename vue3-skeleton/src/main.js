import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './style/element/element.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'
import './style/element/common.scss'

const store = createPinia()

const app = createApp(App)
const icons = Object.keys(ElementPlusIconsVue)

icons.forEach((key) => {
  const component = ElementPlusIconsVue[key]
  app.component(key, component)
})
app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
