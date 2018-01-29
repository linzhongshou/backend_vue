import axios from 'axios'
import qs from 'qs'
// import store from '@/store'
import router from '../router'

/* eslint-disable */
const service = axios.create({
    // baseURL: process.env.BASE_API,
    timeout: 5000 // 请求超时时间
})

service.interceptors.request.use(
    config => {
        if (window.sessionStorage.getItem('access_token') && window.sessionStorage.getItem('refresh_token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('access_token') 
                                            + ' refreshToken ' + window.sessionStorage.getItem('refresh_token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


service.interceptors.response.use(
    response => {
        // eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MTcyMDc3NzYsInVzZXJJZCI6MSwiaWF0IjoxNTE3MjA1OTc2fQ.9j8YwNi8laDgsT3V_WsTmBxUQyFI3tR9WwDiw8_ytYimolaJVw7OlE-hTya45PGgIe8PQuWm7y_oKpCEFpUhRw
        if (response.headers['access-token'] && response.headers['refresh-token']) {
            window.sessionStorage.setItem('access_token', response.headers['access-token']);
			window.sessionStorage.setItem('refresh_token', response.headers['refresh-token']);
        }
        return response;
    },
    error => {
        if (error.message === 'Network Error') {
            Message({ type: 'error', message: 'Network error !!! Try again later !!!' });
        } else if (error.response) {
            switch (error.response.status) {
                // 返回 401 清除token信息并跳转到登录页面
                case 401: router.push({ path: 'login' });
            }
        }
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
);

export default service