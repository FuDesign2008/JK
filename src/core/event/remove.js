/**
 *  移除事件
 *  1) 推荐使用 core.event.bind, core.event.unbind来监听和移除事件
 *  2) 无法移除通过该方法移除通过core.event.bind绑定的事件监听器
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        IS_BINDABLE = require('./isBindable');
    return function (el, type, handler) {
        if (!IS_BINDABLE(el) || !TYPE.isFn(handler)) {
            return;
        }
        type = String(type).toLowerCase();
        //always try to use w3c standard first
        if (el.removeEventListener) {
            el.removeEventListener(type, handler, false);
        } else if (el.detachEvent) {
            el.detachEvent('on' + type, handler);
        }
        // Nullify el to prevent memory leaks in IE
        el = null;
    };
});
