/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-21
 * @time   下午03:56:13
 */


define(function (require) {
    var SUPPORT = require('../bom/support'),
        ELEMENT = require('./element'),
        DOC = require('./doc'),
        ALPHA = 'DXImageTransform.Microsoft.Alpha';
    /**
     *
     * @param {HTMLElmemnt} el
     * @param {String} prop
     *
     */
    return function (el, prop) {
        el = ELEMENT(el);
        if (!el || !prop) {
            return;
        }
        var temp,
            doc = DOC(el),
            win = doc.defaultView,
            canCompute = win && win.getComputedStyle;
        //
        switch (prop) {
        case 'opacity': // 透明度
            if (!SUPPORT.opacity) {// IE6,7,8
                //defalt value of opacity
                temp = 100;
                try {
                    temp = el.filters[ALPHA].opacity;
                } catch (ex) {
                    try {
                        temp = el.filters('alpha').opacity;
                    } catch (ex2) {
                        //do nothing
                    }
                }
                return temp / 100;
            }
            break;
        case 'float':// 浮动
            prop = SUPPORT.cssFloat ? 'cssFloat' : 'styleFloat';
            break;
        }
        //
        temp = el.style[prop];
        /*jslint eqeq: true*/
        if (temp != null) {// if has inline style
            return temp;
        }
        if (canCompute) {
            try {// 获取集合
                temp = win.getComputedStyle(el, '');
            } catch (ex3) {
                //do nothing
            }
            return temp ? temp[prop] : null;
        }
        return el.currentStyle ? el.currentStyle[prop] : null;
    };
});
