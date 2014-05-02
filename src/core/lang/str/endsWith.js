


define(function (require, exports) {
    /**
     * Checks if the string ends with substring.
     * @param {String} s 字符串
     * @param {String} end 字符串
     * @returns {Boolean}
     */
    return function (s, end) {
        var i = s.length - end.length;
        return i >= 0 && s.indexOf(end, i) === i;
    };
});
