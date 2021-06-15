import Vue from 'vue'
import Router from 'vue-router'
//登录
const login = () =>
    import ( /* webpackChunkName: "login" */ "../pages/login.vue");

//首页
const index = () =>
    import ( /* webpackChunkName: "index/index" */ "../pages/index/index.vue");
//系统设置
const system = () =>
    import ( /* webpackChunkName: "system/index" */ "../pages/system/index.vue");

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: login
        }, {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/system',
            name: 'system',
            component: system
        }
    ]
})
router.beforeEach((to, from, next) => {
    console.log("to.path=", to.path);
    if (to.path === '/login') {
        next()
    } else {
        const token = localStorage.getItem('token')
        console.log("token=", token);
        if (!token) {
            next('/login')
        } else {
            next()
        }
    }
})
export default router;