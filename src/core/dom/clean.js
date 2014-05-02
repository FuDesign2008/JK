/**
 * 移除节点绑定的所有事件和缓存的数据
 * 1. 只能移除通过core.event.bind()方法绑定的事件
 * 1. 只能移除通过core.dom.data.set()方法缓存的数据
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-27
 * @time   下午05:55:50
 */


define(function (require) {
    var DATA = require('./data'),
        ELEMENT = require('./element'),
        UNBIND = require('../event/unbind'),
        PARAM = require('../obj/param');
     /**
     *
     * @param {target}conf
     * @param {} conf.target {HTMLElement}
     * @param {} conf.event {Boolean}  是否注册的事件,默认为true
     * @param {} conf.data {Boolean}  是否清除数据缓存，默认为true
     */
    return function (conf) {
        conf = PARAM({
            target: null,
            event: true,
            data: true
        }, conf);
        if (!conf || !conf.target ||
                (conf.event === false && conf.data === false)) {
            return;
        }
        var el = ELEMENT(conf.target);
        if (el) {
            if (conf.event !== false) {
                UNBIND(el);
            }
            if (conf.data !== false) {
                DATA.clearAll(el);
            }
        }
    };
});
