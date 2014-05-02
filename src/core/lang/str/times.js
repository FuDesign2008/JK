


define(function () {
    /**
     *  Concatenates the string count times.
     * @param {String} s 字符串
     * @param {Integer} times
     * @returns {String}
     */
    return function (s, times) {
        return times < 1 ? '' : new Array(times + 1).join(String(s));
    };
});
