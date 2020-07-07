const state = {
    BASE_URL: config.api,
    crumb: '登记管理 > 预备役登记信息',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
};
export default state;