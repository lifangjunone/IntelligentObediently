import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import register from './global'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(store)
register(app)
// app.use(ElementPlus)
app.mount('#app')
