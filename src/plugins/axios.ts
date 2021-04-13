import { Axios } from '@axmine/axios'
const axios = new Axios({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : '/api',
  successCode: [0, 200],
  formatKeys: { code: 'code', result: 'result', message: 'info' },
  useJson: true,
  timeout: 10000
})

interface OptionType {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, unknown>;
  [key: string]: unknown;
}

interface ConfigType {
  method?: 'get'|'post'|'put'|'patch'|'delete'|'head'|'options';
  option?: OptionType;
  [key: string]: unknown;
}

class Http {
  public async request (url: string, data: Record<string, unknown> = {}, config: ConfigType = {}) {
    const response = await axios.request(url, data, config)
    console.log(response)
  }

  public async post (url: string, data: Record<string, unknown> = {}, config: ConfigType = {}) {
    await this.request(url, data, Object.assign({ method: 'post' }, config))
  }

  public async get (url: string, data: Record<string, unknown> = {}, config: ConfigType = {}) {
    await this.request(url, data, Object.assign({ method: 'get' }, config))
  }
}

export default new Http()
