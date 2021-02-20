import axios from "axios";
// import qs from 'qs'
/****** 创建axios实例 ******/
// let service = axios.create(); //创建Loading 的实例
axios.defaults.baseURL = config.ip; // 配置axios请求的地址
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
        if (config.method == "post" || config.method == "put") {
            var t = new Date();
            // console.log(t.getMonth()+1);
            var tf = function(i) {
                return (i < 10 ? "0" : "") + i;
            };
            let startTime, endTime;
            let year = tf(t.getFullYear());
            if (t.getMonth() + 1 > 6) {
                startTime = "-07-01 00:00:00";
                endTime = "-12-31 23:59:59";
            } else {
                startTime = "-01-01 00:00:00";
                endTime = "-06-30 23:59:59";
            }
            const startDate = window.localStorage.getItem('startDate') || year + startTime;
            startDate && (config.data.startDate = startDate);
            const endDate = window.localStorage.getItem('endDate') || year + endTime;
            endDate && (config.data.endDate = endDate);
        } else if (config.method == "get") {
            if (config.params) {
                var t = new Date();
                // console.log(t.getMonth()+1);
                var tf = function(i) {
                    return (i < 10 ? "0" : "") + i;
                };
                let startTime, endTime;
                let year = tf(t.getFullYear());
                if (t.getMonth() + 1 > 6) {
                    startTime = "-07-01 00:00:00";
                    endTime = "-12-31 23:59:59";
                } else {
                    startTime = "-01-01 00:00:00";
                    endTime = "-06-30 23:59:59";
                }
                const startDate = window.localStorage.getItem('startDate') || year + startTime;
                startDate && (config.params.startDate = startDate);
                const endDate = window.localStorage.getItem('endDate') || year + endTime;
                endDate && (config.params.endDate = endDate);
            }
        }
        */
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
/*
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            if (response.data.code) {
                switch (response.data.code) {
                    case 10013:
                        // "登录已失效，请重新登录"  跳转登录页面
                        console.log("登录已失效，请重新登录 跳转登录页面");
                        location.href = config.ip + "/conscriptUser/getSSOUserInfo?callback=jsonpFunc";
                        break;
                    default:
                        break;
                }
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }
      // 服务器状态码不是2开头的的情况
      // 这里可以跟你们的后台开发人员协商好统一的错误状态码
      // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
      // 下面列举几个常见的操作，其他需求可自行扩展
      error => {
          console.log("error=", error);

          if (error.response.status) {
              switch (error.response.status) {
                  // 401: 未登录
                  // 未登录则跳转登录页面，并携带当前页面的路径
                  // 在登录成功后返回当前页面，这一步需要在登录页操作。
                  case 401:
                      vant.Toast.fail("身份验证失败，请关闭重新进入。");
                      break;

                      // 403 token过期
                      // 登录过期对用户进行提示
                      // 清除本地token和清空vuex中token对象
                      // 跳转登录页面
                  case 403:
                      vant.Toast.fail("登录过期，请关闭重新进入。");
                      // 清除token
                      break;

                      // 404请求不存在
                  case 404:
                      vant.Toast.fail("您访问的网页不存在。");
                      break;
                      // 其他错误，直接抛出错误提示
                  default:
                      vant.Toast.fail(error.response.data.message);
              }
              return Promise.reject(error.response);
          }
      }
);
export default service;
*/