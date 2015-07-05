/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-13
 * @time   下午02:35:48
 */


define(function () {
    return function (el) {
        return (el && (el.document || el.ownerDocument)) || document;
    };
});
