


define(function () {

    /**
     *  Converts a string as a capitalized string.
     * @param {String} s 字符串
     * @returns {String}
     */
    return function (s) {
        s = String(s).toLowerCase();
        return s.replace(/[\s\t\xA0\u3000]([a-z])/g, function (match, ch) {
            return ch.toUpperCase();
        }).substr(1);
    };
});
