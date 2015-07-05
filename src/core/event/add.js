/**
 *  绑定事件，在监听函数中禁止使用this关键字
 *  1) 推荐使用 core/event/bind, core/event/unbind来监听和移除事件
 */



define(function (require) {
    var TYPE = require('../obj/type'),
        IS_BINDABLE = require('./isBindable');
    /**
     * @param {HTMLElement} el
     * @param {String} type
     * @param {Function} handler
     * @param {Boolean} useCapture [可选]，默认为false，仅支持w3c的浏览器可用
     *
     */
    return function (el, type, handler, useCapture) {
        //
        if (!IS_BINDABLE(el) || !TYPE.isFn(handler)) {
            return;
        }
        type = String(type).toLowerCase();
        /**
         * always try to use addEventListener( w3c standard ) first
         * eg. In IE9, use 'attachEvent' to bind 'oninput' event to
         *      InputElement or TextareaElement makes no effects,
         *      but 'addEventListener' does.
         */
        if (el.addEventListener) {
            el.addEventListener(type, handler, useCapture || false);
        } else if (el.attachEvent) {
            el.attachEvent('on' + type, handler);
        }
        // Nullify el to prevent memory leaks in IE
        el = null;
    };
});
