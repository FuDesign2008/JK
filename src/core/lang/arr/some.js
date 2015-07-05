/**
 *  判断是否有元素符合条件( Tests whether some elent in the array passes the
 *               test implemented by the provided function.), JavaScript 1.6
 *               新增方法
 * @returns {Boolean}
 */



define(function () {
    /**
     * @param {Array} a 数值
     * @param {Function} fn 回调函数
     * @param {Object} that [可选] 回调函数中this关键字的指向,默认为null
     */
    return Array.prototype.some ? function (a, fn, that) {
        return a.some(fn, that || null);
    } : function (a, fn, that) {
        var i,
            l = a.length;
        that = that || null;
        for (i = 0; i < l; i++) {
            if (fn.call(that, a[i], i, a) === true) {
                return true;
            }
        }
        return false;
    };
});
