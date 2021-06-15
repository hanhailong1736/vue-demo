// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./common/base.css";
import VueJsonp from "vue-jsonp";
import plugin from "./utils/plugin";
Vue.use(plugin);
Vue.use(VueJsonp);
Vue.use(ElementUI);

import "./axios-init";
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})