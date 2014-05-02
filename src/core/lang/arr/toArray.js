/**
 * 注意：
 *  1) 不使用Array.prototype.slice.apply(arrLike)， 因为在IE下这样的方式会产生错误
 * see more: http://www.planabc.net/2010/01/06/arguments_to_array/
 * @author FuDesign2008@163.com
 * @date   2011-8-16
 * @time   上午09:55:06
 */


define(function (require) {
    var TYPE = require('../obj/type');
    /**
     * @param {ArrayLike} arrLike
     * @return {Array}  如果参数是一个ArrayLike对象（包括arguments, nodeList,
     * HTMLCollection），返回新数组; 如果参数是一个数组，直接返回该数组
     *
     */
    return function (arrLike) {
        if (!arrLike || !arrLike.length) {
            return [];
        }
        if (TYPE.isArr(arrLike)) {
            return arrLike;
        }
        var i,
            arr = [],
            l = arrLike.length;
        for (i = 0; i < l; i++) {
            arr.push(arrLike[i]);
        }
        arrLike = null;
        return arr;
    };
});
