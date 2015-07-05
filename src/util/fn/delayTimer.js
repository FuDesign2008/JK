/**
 * @author FuDesign2008@163.com
 * @date   2012-3-6
 * @time   下午05:07:05
 */



define(function (require) {

    var TYPE = require('../../core/obj/type'),
        DESTROY = require('../../core/obj/destroy');
    /**
     * @param {Function} callback
     * @parm {Integer} delay 默认150 ms, >0
     * @return {Object}
     **/
    return function (callback, delay) {
        var timeoutID;
        if (!TYPE.isFn(callback)) {
            return;
        }
        if (isNaN(delay) || delay < 0) {
            delay = 150;
        }
        return {
            start: function () {
                this.clear();
                timeoutID = window.setTimeout(callback, delay);
            },
            clear: function () {
                if (timeoutID) {
                    window.clearTimeout(timeoutID);
                    timeoutID = null;
                }
            },
            runNow: function () {
                this.clear();
                callback();
            },
            destroy: function () {
                var that = this;
                that.clear();
                callback = null;
                DESTROY({
                    target: that
                });
            }
        };
    };
});

