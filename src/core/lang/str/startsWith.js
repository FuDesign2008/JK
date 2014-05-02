


define(function () {
    /**
     *  Checks if the string starts with substring.
     * @param {String} s 字符串
     * @param {String} start 字符串
     * @returns {Boolean}
     */
    return function (s, start) {
        return String(s).indexOf(String(start)) === 0;
    };
});
