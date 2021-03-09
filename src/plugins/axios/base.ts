/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'
import * as Qs from 'qs'
import errorMessage from './errorMessageData'

export interface ResultKeys {
  code: string;
  result: string;
  message: string;
}

export interface OptionType {
  jsonData: boolean;
  formatKeys: ResultKeys;
  successCode: Array<number>;
  timeout?: number;
  baseURL?: string;
  errorMessage?: Record<number, string>;
}

export interface ResultType {
  code: number;
  result: any;
  message: string;
}

// 响应结果类型
export interface ResponseType {
  headers: Record<string, any>;
  status: number;
  statusText: string;
  config?: Record<string, any>;
  data: ResultType;
}

export interface ConfigOptionType {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, any>;
  [key: string]: any;
}

export interface ConfigType {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  option?: ConfigOptionType;
  [key: string]: any;
}

export class Axios {
  private http: AxiosInstance
  private resultData: ResultType = { code: -1, result: {}, message: '' }
  private responseData: ResponseType
  private init: OptionType = {
    jsonData: true,
    formatKeys: { code: 'code', result: 'result', message: 'message' } as ResultKeys,
    successCode: [],
    baseURL: '/',
    timeout: 1000,
    errorMessage
  }

  constructor (option?: OptionType) {
    // 1. 设置初始参数
    if (option?.errorMessage) { Object.assign(this.init.errorMessage, option.errorMessage) }
    if (option?.formatKeys) { this.init.formatKeys = option.formatKeys }
    if (option?.successCode) { this.init.successCode = option.successCode }
    this.init.jsonData = option?.jsonData || false
    this.init.baseURL = option?.baseURL || '/'
    this.init.timeout = option?.timeout || 200000
    this.responseData = {
      headers: {},
      data: this.resultData,
      status: 200,
      statusText: ''
    }
    const opt = this.init.jsonData ? {} : {
      transformRequest: [(data: Record<string, any>) => { return Qs.stringify(data) }]
    }
    const { baseURL, timeout } = this.init
    this.http = axios.create(Object.assign({ baseURL, timeout }, opt))
    this.setInterceptor()
  }

  private getResponseData () { return this.responseData }
  private getResultData () { return this.resultData }
  private getDataType (v: any): string { return Object.prototype.toString.call(v).slice(8, -1).toLowerCase() }

  // 设置拦截器
  private setInterceptor () {
    // 1. 请求拦截
    this.http.interceptors.request.use((config) => {
      return config
    }, (error) => {
      const errMsg = this.init.errorMessage || {}
      const res = this.getResponseData()
      res.status = 800
      res.statusText = JSON.stringify(error)
      res.data.message = errMsg[res.status] || `发起请求出错了 （${res.status}）`
      return Promise.reject(res)
    })

    // 2. 响应拦截
    this.http.interceptors.response.use(
      (response) => {
        const res = this.transformResponseData(response, 'success')
        return Object.assign(response, res)
      },
      (error) => {
        const response = error.response
        const data = this.getResultData()
        const responseData = this.getResponseData()
        if (response) {
          Object.assign(responseData, this.transformResponseData(response, 'error'))
        } else {
          const errorText = JSON.stringify(error) || ''
          const status = errorText.indexOf('timeout of') > -1 ? 801 : 802
          const errorMessage = this.init?.errorMessage || {}
          Object.assign(data, { message: errorMessage[status] })
          Object.assign(responseData, { data, status })
        }
        responseData.config = error?.config || {}
        return Promise.reject(this.responseData)
      }
    )
  }

  // 转换响应数据格式
  private transformResponseData (response: any, type: string) {
    const resData = this.getResultData()
    const res = this.getResponseData()
    res.status = response?.status || 500
    res.headers = response.headers || {}
    res.statusText = response.statusText || ''
    const { data } = response
    if (data) {
    // 1. 后端有返回的数据
      const errorMessage = this.init.errorMessage || {}
      let code = -1
      let message = errorMessage[res.status] || '请求发生错误，请联系工程师' + `(${res.status})`
      let result = {}
      if (this.getDataType(data) === 'object') {
        const k = this.init.formatKeys
        code = response.data[k.code]
        code = isNaN(code) ? -1 : code * 1
        result = response.data[k.result] || {}
        message = response.data[k.message] || ''
      } else {
        message = type !== 'error' ? '错误响应，未获取预期数据' : message
      }
      Object.assign(resData, { code, message, result })
    } else {
    // 2. 无数据返回 将 statusCode 定义为 502
      res.status = 502
      Object.assign(resData, { message: `响应错误，未获取预期数据(${res.status})` })
    }
    res.data = resData
    return res
  }

  // 发起请求，并返回统一的数据格式
  private async doRequest (url: string, data: Record<string, any>, config: ConfigType): Promise<ResponseType> {
    const res = this.getResponseData()
    const post = ['post', 'put', 'patch']
    const mArrs = post.concat(['get', 'delete', 'head', 'options'])
    const confMethod = config?.method || 'get'
    const method = mArrs.includes(confMethod) ? confMethod : 'get'
    const query = post.includes(method) ? { data } : { params: data }
    try {
      const response = await this.http({ url, method, ...Object.assign(query, config.option) })
      res.data = response.data
      res.headers = response.headers
      res.status = response.status
      res.statusText = response.statusText
      res.config = response.config
      return res
    } catch (error) {
      return error
    }
  }

  public async ajax (url: string, data: Record<string, any>, config: ConfigType): Promise<ResponseType> {
    const conf: ConfigType = Object.assign({ method: 'get', option: {} }, config)
    const result = await this.doRequest(url, data, conf)
    if (this.init.successCode.includes(result.data.code)) {
      result.data.code = 0
    } else {
      result.data.message = result.data.message || `数据获取失败了（${result.data.code}）`
    }
    return result
  }
}
