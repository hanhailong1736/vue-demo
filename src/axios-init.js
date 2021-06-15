import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from "axios";
// import qs from 'qs'
import Toast from "./components/Toast";
/****** 创建axios实例 ******/
// let service = axios.create(); //创建Loading 的实例
axios.defaults.baseURL = config.api; // 配置axios请求的地址
axios.defaults.headers.post["Content-Type"] =
    "application/json; charset=utf-8;";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.headers.common["token"] = ""; // 设置请求头为 Authorization
//axios本版本不支持jsonp 自己拓展一个
axios.jsonp = url => {
    if (!url) {
        console.error("Axios.JSONP 至少需要一个url参数!");
        return;
    }
    return new Promise((resolve, reject) => {
        window.jsonCallBack = result => {
            resolve(result);
        };
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        JSONP.src = `${url}?callback=jsonCallBack`;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP);
        }, 500);
    });
};
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = window.localStorage.getItem("token");
        token && (config.headers.token = token);

        /*
            config.method === 'post' ?
                config.data = qs.stringify({...config.data }) :
                config.params = {...config.params };
            */
        return config;
    },
    error => {
        return Promise.error(error);
    }
);
//响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        if (response.status === 200 && response.data && response.data.code) {
            let code = response.data.code
            let message = response.data.message
            if (code == 200) { //成功
                return Promise.resolve(data);
            } else if (code == 1002) { //未登录或登录过期
                window.localStorage.removeItem("token");
                Toast(message);
                setTimeout(() => {
                    location.reload()
                }, 1000);
                return Promise.reject(response);
            } else {
                Toast(message);
                return Promise.reject(message);
            }
        } else {
            if (response.status === 200 && response.data) {
                return Promise.resolve(response);
            } else {
                Toast("接口异常，请稍后再试");
                return Promise.reject('接口异常，请稍后再试');
            }
        }
    }, // 否则的话抛出错误
    error => {
        Toast(error.response);
        return Promise.reject(error.response);
    }
);
Vue.use(VueAxios, axios);