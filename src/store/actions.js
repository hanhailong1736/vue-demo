/**
 * Created by luorh on 2019/04/01
 */

import axios from 'axios';
// import Toast from '../components/toast';
import state from "./state";

const actions = {

    setCrumb({
        commit
    }, crumb) { //设置面包屑导航文字
        commit('crumb', crumb);
    },

    //获取用户信息
    getUserInfo({
        commit
    }, userInfo) {
        axios({
                method: 'get',
                url: '/user/userInfo?_=' + (new Date().getTime()),
            })
            .then(function(res) {
                if (res.data && !res.data.error_code) {
                    if (res.data.data && res.data.data.userInfo) {
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(res.data.data.userInfo)
                        );
                        commit('userInfo', res.data.data.userInfo);
                    }
                } else {
                    // Toast(res.data.message)
                }
            })
            .catch(function(error) {
                console.log("失败err=", error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log("执行了request");
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                // location.href = state.BASE_URL + '/conscriptUser/getSSOUserInfo'
            })
    }
}
export default actions;