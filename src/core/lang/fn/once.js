/**
 * Returns a function that will be executed at most one time, no matter how
 * often you call it. Useful for lazy initialization.
 *
 * @author FuDesign2008@163.com
 * @date   2011-12-2
 * @time   下午06:37:40
 */


define(function (require, exports) {
    var GET_TYPE = require('../obj/getType');
    /**
     * @param {Function} fn
     * @return {Fuction}
     */
    return function (fn) {
        if (GET_TYPE(fn) !== 'function') {
            return;
        }
        var isRun = false,
            ret;
        return function () {
            if (!isRun) {
                isRun = true;
                ret = fn.apply(this, arguments);
            }
            return ret;
        };
    };
});
