/**
 *  过滤数组( Creates a new array with all elents that pass the test
 *               implemented by the provided function.), JavaScript 1.6 新增方法
 */



define(function () {
    /**
     * @param {Array}
     *            a 数值
     * @param {Function}
     *            fn 回调函数
     * @param {Object}
     *            that [可选] 回调函数中this关键字的指向,默认为null
     * @returns {Array} 返回一个新数组
     */
    return Array.prototype.filter ? function (a, fn, that) {
        return a.filter(fn, that || null);
    } : function (a, fn, that) {
        var i, l = a.length, ret = [];
        that = that || null;
        for (i = 0; i < l; i++) {
            if (fn.call(that, a[i], i, a) === true) {
                ret.push(a[i]);
            }
        }
        return ret;
    };
});
