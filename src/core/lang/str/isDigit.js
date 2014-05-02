/**
 *  判断是否全为数字字符
 * @returns {Boolean}
 */



define(function () {
    /**
     * @param {String}
     *            s 字符串
     */
    return function (s) {
        return (/^\d+$/).test(String(s));
    };
});
