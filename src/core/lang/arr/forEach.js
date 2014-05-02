/**
 *  对数组元素执行一次回调函数(Executes a provided function once per array
 *               element.), JavaScript 1.6 新增方法
 */



define(function (require) {
    var TYPE = require('../obj/type');
    /**
     * @param {Array}
     *            a 数值
     * @param {Function}
     *            fn 回调函数
     */
    return function (a, fn) {
        if (!TYPE.isArr(a) || !a.length || !TYPE.isFn(fn)) {
            return;
        }
        var ret,
            i,
            l = a.length;

        for (i = 0; i < l; i++) {
            ret = fn(a[i], i);
            if (ret === false) {
                return;
            }
        }
    };
});
