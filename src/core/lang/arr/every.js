/**
 *
 *  判断所有元素都符合条件( runs a function on items in the array while that
 *               function is returning true. It returns true if the function
 *               returns true for every item it could visit.), JavaScript 1.6
 *               新增方法
 *  see
 *      http://mdn.beonex.com/en
 *      /Core_JavaScript_1.5_Reference/Global_Objects/Array/every
 */



define(function () {
    /**
     * @param {Array}
     *            a 数值
     * @param {Function}
     *            fn 回调函数
     * @param {Object}
     *            that [可选] 回调函数中this关键字的指向,默认为null
     * @returns {Boolean}
     */
    return Array.prototype.every ? function (a, fn, that) {
        return a.every(fn, that || null);
    } : function (a, fn, that) {
        var i, l = a.length;
        that = that || null;
        for (i = 0; i < l; i++) {
            if (fn.call(that, a[i], i, a) !== true) {
                return false;
            }
        }
        return true;
    };
});
