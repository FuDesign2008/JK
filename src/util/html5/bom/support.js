/**
 *
 * @author FuDesign2008@163.com
 * @date   2012-1-18
 * @time   上午11:25:18
 */


define(function (require, exports) {
    var testCanvas = function () {
        var canvas = document.createElement("canvas"),
            ret = false;
        if (canvas && canvas.getContext) {
            ret = true;
        }
        canvas = null;
        return ret;
    };

    return {
        //是否支持桌面通知
        notification: !!(window && window.webkitNotifications),
        //是否支持原生的canvas
        canvas: testCanvas(),
        //是否支持地理位置(geolocation)
        geo: !!navigator.geolocation
    };
});
