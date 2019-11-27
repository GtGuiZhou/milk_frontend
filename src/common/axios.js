import axios from 'axios'
import {Message, MessageBox} from 'element-ui';
import cookies from 'js-cookie'
import router from '../router'

const loginRouterPath = '/login'

const errMsg = (msg) => {
    Message({
        showClose: true,
        message: msg,
        type: 'error'
    });
}


let loginJumpDialogVisual = false

const loginJump = () => {
    if (loginJumpDialogVisual) {
        return
    }
    loginJumpDialogVisual = true
    MessageBox.confirm("系统检测到您还未登录，是否跳转登录？", "跳转登录提示", {
        confirmButtonText: '跳转登录'
    }).then(() => {
        loginJumpDialogVisual = false
        router.push(loginRouterPath)
    }).catch(() => loginJumpDialogVisual = false)
}

// 创建一个 axios 实例
const service = axios.create({
    baseUrl: process.env.VUE_APP_BASEURL,
    timeout: 5000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = cookies.get('adminToken')
    const urlParams = process.env.VUE_APP_URLPARAMS?process.env.VUE_APP_URLPARAMS:false
    if (urlParams){
        if (config['url'].indexOf('?') > 0){
            config['url'] += '&' + urlParams
        } else {
            config['url'] +=  '?' + urlParams
        }
    }
    console.log(config)
    if (token) config.headers['token'] = token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if ('set-token' in response.headers && response.headers['set-token']) {
        const token = response.headers['set-token']
        cookies.set('adminToken',token,{ expires: 1 })
    }

    if (!response.data) {
        errMsg('响应为空')
        return Promise.reject(response.data);
    }

    if (!response.data.code) {
        errMsg(response.data.msg)// 对响应错误做点什么
        return Promise.reject(response.data);
    }
    return response.data.data;
}, function (error) {
    console.error("======================================request error======================================")
    console.error(error.response)
    if (error.response.status === 500) {
        errMsg("服务器内部错误")
        return Promise.reject(error);
    }

    errMsg(error.response.data.msg)// 对响应错误做点什么
    if (error.response.status == 401) {
        loginJump()
        return Promise.reject(error);
    }

    return Promise.reject(error);
});


service.upload = (url, file) => {
    let formData = new FormData();
    formData.append('file', file)
    return service.post(url, formData)
}

export default service
