let BASE_URL = ''
let BASE_NAME = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://192.168.137.228:8000'
  BASE_NAME = 'prod'
} else if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api/backend_manage'
  BASE_NAME = 'dev'
} else {
  BASE_URL = 'http://192.168.137.228:8000'
  BASE_NAME = 'test'
}

export { BASE_URL, TIME_OUT, BASE_NAME }
