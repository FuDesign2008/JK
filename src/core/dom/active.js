/**
 *  获取当前活动对象
 */



define(function (require) {
    var GET_RAW = require('../event/getRaw');
    return function () {
        var doc = document,
            ret = doc.activeElement;
        if (!ret) {
            ret = (GET_RAW() || {}).explicitOriginalTarget || null;
        }
        return ret || doc.body;
    };
});
