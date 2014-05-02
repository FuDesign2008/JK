/**
 * 对数值素组进行从低到高排序
 * @author FuDesign2008@163.com
 * @date   2011-8-25
 * @time   上午12:22:33
 */



define(function (require) {
    var TYPE = require('../obj/type');

    return function (arr) {
        if (TYPE.isArr(arr)) {
            if (arr.length) {
                arr.sort(function (a, b) {
                    return a < b ? -1 : (a > b ? 1 : 0);
                });
            }
            return arr;
        }
    };
});
