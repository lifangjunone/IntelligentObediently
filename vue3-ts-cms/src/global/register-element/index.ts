import { App } from 'vue'
import { ElButton, ElRow, ElCol } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = [ElButton, ElRow, ElCol]

export function registerElement(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
