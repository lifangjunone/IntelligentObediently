/* eslint-disable */
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'

import { FjRequestInterceptors, FjRequestConfig } from './type'
import { DEFAULT_LOADING } from '@/global/content'

class FjRequest {
  instance: AxiosInstance
  interceptors?: FjRequestInterceptors
  loading?: any
  showLoading: boolean

  constructor(config: FjRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 【Request】添加通用的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('通用请求成功拦截器')

        if (this.showLoading === true) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading ...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }

        return config
      },
      (err) => {
        // console.log('通用请求失败拦截器')
        return err
      }
    )

    // 【Response】添加通用的响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        // console.log('通用响应成功拦截器')
        return res.data
      },
      (err) => {
        this.loading?.close()
        // console.log('通用请求失败拦截器')
        return err
      }
    )
  }

  request<T = any>(config: FjRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 是否显示 loading
      if (config?.showLoading) {
        this.showLoading = config.showLoading
      }
      // 单独调用拦截器
      if (config.interceptors?.requestInterceptor) {
        config.interceptors.requestInterceptor(config)
        // console.log('单独请求调用拦截器')
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
            // console.log('单独响应调用拦截器')
          }
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: FjRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: FjRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: FjRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: FjRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default FjRequest
