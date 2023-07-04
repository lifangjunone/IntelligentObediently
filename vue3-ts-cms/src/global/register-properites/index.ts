import { App } from 'vue'
import { formatUtcString } from '@/utils/time-format'

export function registeerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
