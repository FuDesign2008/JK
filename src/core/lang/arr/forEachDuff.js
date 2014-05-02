/**
 *  forEach方法的 Duff's Device
 *  1) 不支持return false中断
 *  2) 只有处理大数据集(一般要10000条以上)且 fn函数的操作比较复杂时，forEachDuff才有优势
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-26
 * @time   下午10:04:11
 */


define(function (require) {
    var TYPE = require('../obj/type');

    /**
     * @param {Array} a 数值
     * @param {Function} fn 回调函数
     */
    return function (a, fn) {
        if (!TYPE.isArr(a) || !a.length || !TYPE.isFn(fn)) {
            return;
        }
        var i = a.length,
            n = Math.floor(i / 8),
            left = i % 8;

        i = 0;
        if (left > 0) {
            do {
                fn(a[i], i++);
            } while (--left);
        }
        do {
            fn(a[i], i++);
            fn(a[i], i++);
            fn(a[i], i++);
            fn(a[i], i++);
            fn(a[i], i++);
            fn(a[i], i++);
            fn(a[i], i++);
            fn(a[i], i++);
        } while (--n > 0);
    };
});
