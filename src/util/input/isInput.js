/**
 * 判断是否为可输入的元素,一般为input, textarea
 * @author FuDesign2008@163.com
 * @date   2011-8-25
 * @time   下午12:25:26
 */


define(function (require) {
    var IS_TAG = require('../../core/dom/isTag');
    return function (el) {
        //考虑到html5，不能做input.type==='text'判断
        return IS_TAG(el, 'input') || IS_TAG(el, 'textarea');
    };
});
