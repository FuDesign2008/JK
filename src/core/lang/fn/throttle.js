/**
 *  window.onscroll    element.onmousemove  可以使用throttle封装监听函数
 *  see http://blog.csdn.net/fudesign2008/article/details/7035537
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-30
 * @time   下午04:02:55
 *
 */


define(function (require) {
    var TYPE = require('../obj/type');
    /**
     *
     * @param {Function} callback 回调函数
     * @param {Integer} delay 延迟时间，单位为毫秒(ms)，默认150
     * @param {Boolean} immediatly 第一次是否会立即运行，默认为false
     * @return {Function}
     */
    return function (callback, delay, immediatly) {
        if (TYPE.isFn(callback)) {
            return;
        }
        delay = delay || 150;
        if (delay <= 0) {
            return function () {
                callback.apply(this, arguments);
            };
        }
        var last = (new Date()).getTime() - delay;
        //保证第一次立即运行
        last = immediatly === true ? (last - 1) : last;

        return function () {
            var now = (new Date()).getTime(),
                that = this;
            if (now - last > delay) {
                last = now;
                callback.apply(that, arguments);
            }
        };
    };
});
