import { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface FjRequestInterceptors {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface FjRequestConfig extends AxiosRequestConfig {
  interceptors?: FjRequestInterceptors
  showLoading?: boolean
}
