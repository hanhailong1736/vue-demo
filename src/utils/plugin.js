const formatDateTime = function(time, format) {
    var t = new Date(time);
    var tf = function(i) {
        return (i < 10 ? '0' : '') + i
    };
    if (!format) {
        format = 'yyyy-MM-dd HH:mm:ss'
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
};
var password = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
    "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D",
    "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
]; //!@#$%^&*
const passData = function(length) {
        var Str = "";
        for (var i = 0; i < length; i++) {
            Str += password[Math.floor(Math.random() * password.length)];
        }
        return Str;
    }
    /**
     * {
          bizType: 'wap',
          host: 'msearch',
          type: '3'
        }  =>  "bizType=wap&host=msearch&type=3"
     * @param {*} data 
     */
const formatParams = (data) => {
    let arr = [];
    for (let name in data) {
        if (typeof(data[name]) == 'object' && data[name].length) { //数组
            for (let index = 0; index < data[name].length; index++) {
                arr.push(encodeURIComponent(name) + '[' + index + ']=' + encodeURIComponent(
                    data[name][index]));
            }
        } else {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
    }
    return arr.join('&');
}


export default {
    install: Vue => {
        Vue.mixin({
            data() {
                return {

                }
            },
            methods: {
                formatDateTime,
                passData,
                formatParams
            }
        })
    }
}