import state from "./state";

const getters = {
    BASE_URL: state => {
        return state.BASE_URL;
    },
    crumb: state => {
        return state.crumb;
    },
    userInfo: state => {
        return state.userInfo;
    }

}

export default getters;