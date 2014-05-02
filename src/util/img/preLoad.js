/**
 *
 * @author FuDesign2008@163.com
 * @date   2012-3-19
 * @time   下午12:10:22
 */


define(function (require) {
    var TYPE = require('../../core/obj/type'),
        PARAM = require('../../core/obj/param'),
        FOR_EACH = require('../../core/arr/forEach');
    /**
     *
     * @param {Object} conf
     * @param {} conf.url {String} 图片地址
     * @param {} conf.time {Integer} 加载时间限制 默认30000 ms
     * @param {} conf.onLoad {Function}
     * @param {} conf.onError {Function}
     * @param {} conf.onAbort {Function}
     * @param {} conf.onTimeout {Function}
     */
    return function (conf) {
        conf = PARAM({
            url: null,
            time: 30000,
            onLoad: null,
            onErorr: null,
            onAbort: null,
            onTimeout: null
        }, conf);
        if (!conf.url && conf.time <= 0) {
            return;
        }
        //
        var img = new Image(),
            timeoutID = null,
            clear = function () {
                window.clearTimeout(timeoutID);
            },
            nullify = function () {
                img.onload = img.onerror = img.onabort = null;
                img = null;
            },
            events = ['load', 'error', 'abort'],
            upEvents = ['Load', 'Error', 'Abort'];

        FOR_EACH(events, function (val, index) {
            img[val] = function () {
                var up = upEvents[index];
                clear();
                if (TYPE.isFn(conf[up])) {
                    conf[up].apply(img);
                }
                nullify();
            };
        });
        img.src = conf.url;
        timeoutID = window.setTimeout(function () {
            if (TYPE.isFn(conf.onTimeout)) {
                conf.onTimeout.apply(img);
            }
            nullify();
        }, conf.time);
    };
});

