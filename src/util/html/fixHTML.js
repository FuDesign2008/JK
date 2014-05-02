/**
 * 对html字符串进行全部fix，调用fixHref, fixAlt等方法;
 * @author FuDesign2008@163.com
 * @date   2011-8-24
 * @time   下午07:43:38
 */


define(function (require) {
    var FIX_HREF = require('./fixHref'),
        FIX_ALT = require('./fixAlt');
    return function (str) {
        var obj;
        if (str) {
            obj = {
                html: String(str)
            };
            str = FIX_HREF(obj);
            str = FIX_ALT(obj);
            //
            return str;
        }
    };
});
