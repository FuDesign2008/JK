


define(function (require) {
    /**
     *  Converts a string separated by dashes into a camelCase
     *  equivalent. For instance, "foo-bar" would be converted to
     *  "fooBar".uses this internally for translating CSS properties
     *  into their DOM "style" property equivalents.
     * @param {String} s 字符串
     * @return {String}
     */
    return function (s) {
        return String(s).replace(/-+([^\-])?/g, function (match, ch) {
            return ch ? ch.toUpperCase() : "";
        });
    };
});
