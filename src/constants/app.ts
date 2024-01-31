export default {
  /**
   * api请求地址，这里读取env环境变量中的VITE_APP_API
   */
  BaseUrl: import.meta.env.BASE_URL,
  /**
   * 网络请求超时时间，单位毫秒
   */
  RequestTimeout: 5000
}
