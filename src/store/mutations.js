const mutations = {

    crumb(state, payload) {
        state.crumb = payload;
    },

    userInfo(state, resData) {
        state.userInfo = resData
    }

}

export default mutations;