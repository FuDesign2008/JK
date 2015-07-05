/**
 *  (Creates a new array with the results of calling a provided
 *               function on every elent in this array.), JavaScript 1.6 新增方法
 * @returns {Array}
 */



define(function () {
    /**
     * @param {Array}
     *            a 数值
     * @param {Function}
     *            fn 回调函数
     * @param {Object}
     *            that [可选] 回调函数中this关键字的指向,默认为null
     */
    return Array.prototype.map ? function (a, fn, that) {
        return a.map(fn, that || null);
    } : function (a, fn, that) {
        var i,
            l = a.length,
            ret = [];
        that = that || null;
        for (i = 0; i < l; i++) {
            ret.push(fn.call(that, a[i], i, a));
        }
        return ret;
    };
});
