/**
 * 见 http://blog.csdn.net/fudesign2008/article/details/6052416
 *
 * @author FuDesign2008@163.com
 * @date   2012-4-16
 * @time   下午06:34:22
 */


define(function () {

    /**
     * @param {String}
     * @return {String}
     */
    return function (uriComponent) {
        if (!uriComponent) {
            return uriComponent;
        }
        var ret;
        try {
            ret = decodeURIComponent(uriComponent);
        } catch (ex) {
            ret = window.unescape(uriComponent);
        }
        return ret;
    };
});
