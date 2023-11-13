import axios from 'axios'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
// 创建axios实例
const http = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

const router = useRouter()
// axios请求拦截器
http.interceptors.request.use(config => {
    // 从pinia获取token
    // 按照后端要求凭借token数据
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
    // 统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.msg
    })
    // 401token错误处理
    // 1. 清除本地用户数据 2. 挑战到登录页
    const userStore = useUserStore()
    if (e.response.status == 401) {
        userStore.clearUserInfo()
        router.replace('/login')
    }
    return Promise.reject(e)
})


export default http