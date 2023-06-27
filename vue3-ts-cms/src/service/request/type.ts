import { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface FjRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface FjRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: FjRequestInterceptors<T>
  showLoading?: boolean
}
