import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const TIME_FORMAR = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = TIME_FORMAR
) {
  return dayjs.utc(utcString).format(format)
}
