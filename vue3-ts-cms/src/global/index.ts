import { App } from 'vue'
import { registerElement } from './register-element'
import { registeerProperties } from './register-properites'

export default function register(app: App) {
  registerElement(app)
  registeerProperties(app)
}
