/**
 * to get user selection text
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
        var obj = SELECTION();
        /*jslint eqeq: true*/
        if (obj.text  != null) {
            return obj.text;
        }
        return String(obj);
    };
});

