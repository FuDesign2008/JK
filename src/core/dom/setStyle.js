/**
 *  1) opacity 的值按照 w3c 的标准
 * @author FuDesign2008@163.com
 * @date   2011-8-21
 * @time   下午04:03:47
 */


define(function (require) {
    var SUPPORT = require('../bom/support'),
        FOR_OWN = require('../obj/forOwn'),
        GET_TYPE = require('./getStyle'),
        ELEMENT = require('./element'),
        FLOAT = SUPPORT.cssFloat ? 'cssFloat' : 'styleFloat';
    /**
     *
     * @param {HTMLElement} el
     * @param {String | Object} prop
     * @param {String|Number} val
     */
    return function (el, prop, val) {
        el = ELEMENT(el);
        if (!el || !prop) {
            return;
        }
        var supportOpacity = SUPPORT.opacity,
            setStyle = function (value, key) {
                if (key === 'opacity' && !supportOpacity) {
                    el.style.filter = 'alpha(opacity=' + val * 100 + ')';
                    //???
                    if (!el.currentStyle || !el.currentStyle.hasLayout) {
                        el.style.zoom = 1;
                    }
                    return;
                }
                key = key === 'float' ? FLOAT : key;
                el.style[key] = value;
            };
        //
        if (GET_TYPE(prop) === 'object') {
            FOR_OWN(prop, setStyle);
        } else {
            setStyle(val, prop);
        }
    };
});
