"use strict";

import Vue from 'vue';
import axios from "axios";
import {router} from '../router'
import store from '../store'
import localforage from 'localforage'
import { Message } from 'element-ui'
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = "http://deployer.work"|| process.env.baseURL || process.env.apiUrl || '';


let config = {
    // baseURL: "http://blog.work"||process.env.baseURL || process.env.apiUrl || "http://blog.work"
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

const token = localStorage.getItem('token')
if(token){
    _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error

        return Promise.reject(error);
    }
);
// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        switch (error.response.status) {
            case 401:
                if(router.currentRoute.name!=='login'){
                    // 返回 401 清除token信息并跳转到登录页面

                    router.replace({
                        path: 'login',
                        query: {redirect: store.getters['getBaseIntend']}
                    });
                }
                break;
            case 422:
                let data = error.response.data.errors
                let content = ''
                Object.keys(data).map(function (key) {
                    let value = data[key]
                    content += value[0]+'<br>'
                })
                Message({
                    dangerouslyUseHTMLString: true,
                    message: content,
                    type: 'error'
                });
                break;
        }
        // Do something with response error
        return Promise.reject(error);
    }
);
Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;