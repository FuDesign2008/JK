/**
 *  返回不含undefined和null值的新数组(Returns a new version of the array,
 *               without any null/undefined values.)
 * @returns {Array}
 */




define(function (require) {
    /**
     * @param {Array}
     *            a 数值
     */
    return function (a) {
        var i, l = a.length, ret = [];
        for (i = 0; i < l; i++) {
            if (a[i] != null) {
                ret.push(a[i]);
            }
        }
        return ret;
    };
});
