import axios from 'axios'
import { Loading, Message } from 'element-ui'

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中....',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(
    (confing) => {
        //startLoading()
        //设置请求头
        if (localStorage.jwt) {
            confing.headers.Authorization = localStorage.jwt
            console.log("已拦截并加入jwt");
        }
        console.log("已拦截未能加入jwt");
        return confing
    },
    (error) => {
        //endLoading()
        console.log("error-http.js",error);
        return Promise.reject(error)
    }
)

export default axios
