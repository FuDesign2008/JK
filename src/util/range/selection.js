/**
 * to get user selection
 * see for more
 * http://www.quirksmode.org/dom/range_intro.html
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-12
 * @time   下午06:34:22
 */


define(function () {
    return function () {
        // w3c first, for opera support both
        if (window.getSelection) {
            return window.getSelection();
        }
        // IE
        return document.selection.createRange();
    };
});
