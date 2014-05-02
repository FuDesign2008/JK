/**
 *  计算浏览器可见范围内的高度和宽度(scrollBar不包含在内)
 *
 */


define(function (require, exports) {
    var DOC = require('./doc');
    /**
     * @param {HTMLElement} el [可选]
     *
     */
    return function (el) {
        var doc = DOC(el),
            docE = doc.documentElement,
            docB = doc.body,
            css1 = doc.compatMode === 'CSS1Compat';
        return {
            x : (css1 && docE.clientWidth) || docB.clientWidth ||
                docE.clientWidth,
            y : (css1 && docE.clientHeight) || docB.clientHeight ||
                docE.clientHeight
        };
    };
});
