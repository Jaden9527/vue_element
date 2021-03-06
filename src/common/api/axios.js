import axios from 'axios'
// import { getToken, setToken } from '../utils'
// import router from '../../router';
// 创建 axios 实例
let http = axios.create({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    timeout: 60000,
    responseType: 'json',
    // token: getToken()
})

// 添加请求拦截器
http.interceptors.request.use(config => {
    if (config.method === 'post' || config.method === 'put') {
        // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
        config.data = JSON.stringify(config.data)
    } else if (config.method === 'get') {
        // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
        let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
        config.url += symbol + '_=' + Date.now()
    }
    // 请求发送前进行处理
    return config
}, error => {
    // 请求错误处理
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
    let { data } = response
    return data
}, error => {
    let info = {}
    let { status, statusText, data } = error.response
    if (!error.response) {
        info = {
            code: 5000,
            msg: 'Network Error'
        }
    } else {
        // 此处整理错误信息格式
        info = {
            code: status,
            data: data,
            msg: statusText
        }
    }
    return Promise.reject(info)
})

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
    return http
}