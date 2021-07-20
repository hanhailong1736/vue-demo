const state = {
    BASE_URL: config.api,
    crumb: [],
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
};
export default state;