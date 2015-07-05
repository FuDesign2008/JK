/**
 * 得到文档的scrollLeft 和scrollTop
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-21
 * @time   下午02:55:59
 */


define(function (require) {
    var DOC = require('./doc');
    /**
     * @param {HTMLElement}
     *            el 可选
     * @return {Object}
     *          obj.x
     *          obj.y
     */
    return function (el) {
        var doc = DOC(el),
            docE = doc.documentElement,
            docB = doc.body;
        return {
            //The pageXOffset and pageYOffset properties returns the pixels the
            //current document has been scrolled from the upper left corner of
            //the window, horizontally and vertically.
            //The pageXOffset and pageYOffset properties are supported in all
            //major browsers, except Internet Explorer.
            //See more:
            // http://www.w3schools.com/jsref/prop_win_pagexoffset.asp
            // https://developer.mozilla.org/en/window.scrollY
            x: Math.max(window.pageXOffset || 0,
                    docE.scrollLeft, docB.scrollLeft),
            y: Math.max(window.pageYOffset || 0,
                    docE.scrollTop, docB.scrollTop)
        };
    };
});
