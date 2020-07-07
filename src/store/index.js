import Vue from 'vue'
import Vuex from 'vuex'

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;

/*
const debug = true

export default new Vuex.Store({
  modules: {
    home
  },
  plugins: debug ? [createLogger()] : []   // 是否开启vuex的debug模式
})
*/