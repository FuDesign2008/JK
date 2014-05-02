/**
 * 移除所有子节点绑定的所有事件和缓存的数据
 * 1. 只能移除通过core.event.bind()方法绑定的事件
 * 1. 只能移除通过core.dom.data.set()方法绑定的事件
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-27
 * @time   下午05:55:50
 */


define(function (require) {
    var FOR_EACH = require('../arr/forEach'),
        ELEMENT = require('./element'),
        PARAM = require('../obj/param'),
        BY_TAG_CLASS = require('./byTagClass'),
        CLEAN = require('./clean');
     /**
     *
     * @param {target}conf
     * @param {HTMLElement} conf.target   【必须】
     * @param {Boolean} conf.event   是否移除事件,默认为true
     * @param {Boolean} conf.data   是否清除数据缓存，默认为true
     * @param {String} conf.tag  【可选】支持*
     *              在IE7下，<object />.getElementsByTagName('*') 是有bug的
     *              见 http://blog.csdn.net/fudesign2008/article/details/6967583
     * @param {String} conf.className   【可选】
     */
    return function (conf) {
        conf = PARAM({
            target: null,
            event: true,
            data: true,
            tag: '*',
            className: ''
        }, conf);

        if (!conf || !conf.target ||
                (conf.event === false && conf.data === false)) {
            return;
        }
        var target = ELEMENT(conf.target),
            arr;
        if (!target) {
            return;
        }
        arr = BY_TAG_CLASS(target, conf.tag, conf.className);
        if (arr && arr.length) {
            FOR_EACH(arr, function (el) {
                CLEAN({
                    target: el,
                    event: conf.event,
                    data: conf.data
                });
            });
        }
    };
});
