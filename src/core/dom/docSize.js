


define(function (require, exports) {
    var DOC = require('./doc');
    /**
     *  计算整个页面的高度和宽度(scrollBar不包含在内)
     * @param {HTMLElement} 可选
     *
     */
    return function (el) {
        var doc = DOC(el),
            docE = doc.documentElement,
            docB = doc.body;
        return {
            x : Math.max(docE.clientWidth, docB.scrollWidth, docE.scrollWidth,
                    docB.offsetWidth, docE.offsetWidth),
            y : Math.max(docE.clientHeight, docB.scrollHeight,
                    docE.scrollHeight, docB.offsetHeight, docE.offsetHeight)
        };
    };
});
