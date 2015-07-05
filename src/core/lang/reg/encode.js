


define(function () {

    /**
     *  转义正则表达式中的特殊字符
     * @param {String}
     *            s 字符串
     * @returns {String}
     */
    return function (s) {
        return String(s).replace(/([.*?\^$=!:{}()|\[\]\/\\+])/g, '\\$1');
    };
});
