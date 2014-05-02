/**
 * to get user selection
 * see for more
 * http://www.quirksmode.org/dom/range_intro.html
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-12
 * @time   下午06:34:22
 */


define(function (require) {
    var SELECTION = require('./selection');

    return function () {
        var obj = SELECTION(),
            range;

        if (obj.getRangeAt) {
            return obj.getRangeAt(0);
        }
        range = document.createRange();
        range.setStart(obj.anchorNode, obj.anchorOffset);
        range.setEnd(obj.focusNode, obj.focusOffset);
        return range;
    };
});

