import FjRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const fjRequest = new FjRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default fjRequest
