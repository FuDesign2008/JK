/**
 * 返回独一无二的整数
 * @author FuDesign2008@163.com
 * @date   2011-8-16
 * @time   上午09:36:26
 */


define(function (require, exports) {
    var prefix = String(new Date().getTime()),
        counter = 0;
    return function () {
        counter += 1;
        return prefix + counter;
    };
});
