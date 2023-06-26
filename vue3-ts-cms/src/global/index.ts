import { App } from 'vue'
import { registerComponent } from './register-element'

export default function register(app: App) {
  registerComponent(app)
}
