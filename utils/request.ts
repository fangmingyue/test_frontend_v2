// src/utils/request.ts
import axios from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number
  }
}

const service = axios.create({
  baseURL: import.meta.env.NUXT_PUBLIC_API_BASE,
  timeout: 10000,
})

// 請求攔截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// 回應攔截器
service.interceptors.response.use(
  (response: any) => response.data,
  (error) => {
    const { response } = error
    if (!response) {
      console.error('網路錯誤')
    } else {
      const status = response.status
      switch (status) {
        case 401:
          console.error('未授權')
          break
        case 403:
          console.error('禁止訪問')
          break
        case 500:
          console.error('伺服器錯誤')
          break
        default:
          console.error(response.data.message || '未知錯誤')
      }
    }
    return Promise.reject(error)
  }
)

// ✅ 封裝常用方法：自動加型別支援
const http = {
  get<T = any>(url: string, config?: any) {
    return service.get<T>(url, config)
  },
  post<T = any>(url: string, data?: any, config?: any) {
    return service.post<T>(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: any) {
    return service.put<T>(url, data, config)
  },
  delete<T = any>(url: string, data?: any, config?: any) {
    return service.delete<T>(url, { data, ...config })
  },
}

export default http
