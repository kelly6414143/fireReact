import React from 'react';
import axios from 'axios'

function axiosMaps() {

    const instance = axios.create({
        baseURL: 'https://l8-upgrade-apis.vercel.app/'
    });


    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        React.$devConsole('request', config)
        return config;
    }, function (error) {
        React.$devConsole('requesterr', error)
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        React.$devConsole('response', response)
        const { data } = response
        return data;
    }, function (error) {
        React.$devConsole('responseerr', error)
        // 对响应错误做点什么
        return Promise.reject(error);
    });


    const post = (url, param, header = {}) => {
        return instance.post(url, param, header).then((res) => {
            React.$devConsole('postres', res)
            return res
        }).catch((error) => {
            React.$devConsole('posterr', error)
            return error.response.data
        })
    }

    const get = (url, header = {}) => {
        return instance.get(url, header).then((res) => {
            React.$devConsole('postres', res)
            return res
        }).catch((error) => {
            React.$devConsole('posterr', error)
            return error.response.data
        })
    }

    const put = (url, param, header = {}) => {
        return instance.put(url, param, header).then((res) => {
            React.$devConsole('postres', res)
            return res
        }).catch((error) => {
            React.$devConsole('posterr', error)
            return error.response.data
        })
    }

    return {
        post: post,
        get: get,
        put: put
    }

}

export default axiosMaps