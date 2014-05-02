/**
 *  判断是否是原生的浏览器事件
 *  注意：window.event 未必等于自身，因为window未必等于自身
 */



define(function (require) {
    var UA = require('../bom/ua'),
        rStd = /\[object\s+[a-zA-Z]*Event\]/,
        rIE = /\[object\s+Object\]/,
        rIEType = /^[a-z]+$/i,
        toString = Object.prototype.toString;
    /**
     * @param {Object} o
     *
     */
    return function (o) {
        var str;
        if (o && o._isFixedEvent !== true) {
            str = toString.call(o);
            // (window.event == window.event)===false
            // the window.event does not equal itself, becasue the window
            // object is not always equal itself, see
            // http://www.davidflanagan.com/2007/03
            // /more-on-ie-and-windowevent.html
            //-- Did you know that sometimes the window object is not equal
            // to itself!?
            //-- I think that the window/global object is
            // constantly being cloned.
            //-- I can't prove it but I feel it
            // if (rStd.test(str) || o === window.event) {
            if (rStd.test(str)) {
                return true;
            }
            /*jslint eqeq: true */
            if (UA.IE && rIE.test(str) && o.type && rIEType.test(o.type) &&
                    o.cancelBubble != null && o.returnValue != null) {
                return true;
            }
        }
        //
        return false;
    };
});
