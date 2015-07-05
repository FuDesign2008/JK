/**
 * IE下 window.onresize 有bug 可以使用debounce封装监听函数
 * @see http://blog.csdn.net/fudesign2008/article/details/7035537
 * @author FuDesign2008@163.com
 * @date   2011-11-30
 * @time   下午04:02:55
 */


define(function (require) {
    var GET_TYPE = require('../obj/getType');

    /**
     *
     * @param {Function} callback 回调函数
     * @param {Integer} delay   延迟时间，单位为毫秒(ms)，默认150
     * @return {Function}
     */
    return function (callback, delay) {
        if (GET_TYPE(callback) !== 'function') {
            return;
        }
        delay = delay || 150;
        var timeoutId;
        return function () {
            var args = arguments,
                that = this;
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(function () {
                callback.apply(that, args);
            }, delay);
        };
    };
});
