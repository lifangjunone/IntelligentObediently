import { ElButton } from 'element-plus'

const components = [ElButton]

export function registerComponent(app: any) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
