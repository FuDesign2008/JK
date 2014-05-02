/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-13
 * @time   下午02:40:12
 */


define(function (require) {
    var DOC = require('./doc');
    return function (el) {
        var doc = DOC(el);
        return doc.compatMode === 'CSS1Compat' ?
                    doc.documentElement : doc.body;
    };
});
