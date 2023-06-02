import axios from 'axios'
import { ref } from 'vue'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import router from '../router'
// 若不先实例化，会出现一次请求，拦截器拦截多次请求与响应问题
const service = axios.create({
  baseURL: '/api/v1',
  timeout: 99999
})
// 显示loading
let loadingInstance
const count = ref(0)
// const responseErrorCount = 0 // 避免连续响应拦截多个token过期
const showLoading = (text) => {
  if (!text) {
    text = 'Loading'
  }
  if (count.value === 0) {
    loadingInstance = ElLoading.service({
      // lock: true,
      fullscreen: true,
      text
      // spinner: 'el-icon-loading'
      // background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  count.value += 1
}

// 隐藏loading
const closeLoading = () => {
  if (count.value <= 0) return
  //
  count.value -= 1
  if (count.value === 0) {
    loadingInstance.close()
  }
}
// axios.defaults.headers.common.Accept = '*/*'
// http request 拦截器
service.interceptors.request.use(
  (config) => {
    console.log('config', config)
    if (config.url === '/api/v1/base/login') {
      showLoading('登录中，请稍候...')
    }
    if (localStorage.getItem('token')) {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
        ...config.headers
      }
    } else if (!config.url.includes('/base/login')) {
      closeLoading()
      ElMessage.error('token丢失，请重新登录')
      router.push({ name: 'login' })
      return false
    }
    return config
  },
  (error) => {
    console.log('请求拦截器error', error)
    closeLoading()
    ElMessage({
      showClose: true,
      message: error,
      type: 'error'
    })
    return error
  }
)
// http response 拦截器
service.interceptors.response.use(
  (response) => {
    console.log('response11', response)
    closeLoading()
    if (response.status && response.data.code === 200) {
      return response.data
    }
    // 热更新时会出现response不包含完整头，只包含后端返回的data的情况，特殊处理一下
    // if (!response.status && response.code === 200) {
    //   return response
    // }
    ElMessage({
      showClose: true,
      message: response.data.msg,
      type: 'error'
    })
    return response.data.msg ? response.data : response
  },
  (error) => {
    closeLoading()
    console.log('error', error)
    if (!error.response) {
      ElMessageBox.confirm(`
        <p>检测到请求错误</p>
        <p>${error}</p>
        `, '请求报错', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: '稍后重试',
        cancelButtonText: '取消'
      })
      return false
    }
    switch (error.response.status) {
      case 500:
        ElMessageBox.confirm(`
        <p>检测到接口错误${error}</p>
        <p>错误码<span style="color:red"> 500 </span>：${error.response.data.msg}</p>
        <p>原因：${error.response.data.reason}</p>
        `, '接口报错', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '我知道了',
          cancelButtonText: '取消'
        })
        break
      case 400:
        ElMessageBox.confirm(`
            <p>检测到接口错误${error}</p>
            <p>错误码<span style="color:red"> 400 </span>：${error.response.data.msg}</p>
            <p>原因：${error.response.data.reason}</p>
            `, '接口报错', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '我知道了',
          cancelButtonText: '取消'
        })
        break
      case 404:
        ElMessageBox.confirm(`
          <p>检测到接口错误${error}</p>
          <p>错误码<span style="color:red"> 404 </span>：此类错误多为接口未注册（或未重启）或者请求路径（方法）与api路径（方法）不符--如果为自动化代码请检查是否存在空格</p>
          <p>原因：${error.response.data.reason}</p>
          `, '接口报错', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: '我知道了',
          cancelButtonText: '取消'
        })
        break
    }
    return Promise.reject(error)
  }
)
export default service
