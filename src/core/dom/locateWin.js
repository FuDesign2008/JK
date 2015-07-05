/**
 *  获取一般的HTMLElement相对于窗口的位置
 * @author FuDesign2008@163.com
 * @date   2011-9-16
 * @time   下午03:17:30
 */


define(function (require) {
    var DOC_SCROLL = require('./docScroll'),
        LOCATE_DOC = require('./locateDoc');
    /**
     * @param {HTMLElement} el
     */
    return function (el) {
        var locateDoc = LOCATE_DOC(el),
            docScroll = DOC_SCROLL(el);
        if (locateDoc) {
            return {
                x: locateDoc.x - docScroll.x,
                y: locateDoc.y - docScroll.y
            };
        }
    };
});
