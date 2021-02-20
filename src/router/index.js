import Vue from 'vue'
import Router from 'vue-router'
//首页
const index = () =>
    import ( /* webpackChunkName: "index/index" */ "../pages/index/index.vue");

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },

    ]
})