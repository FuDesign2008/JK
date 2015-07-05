/**
 * @author FuDesign2008@163.com
 * @date   2011-11-1
 * @time   上午11:44:10
 */


define(function () {

    /**
     * 粗劣方法判断一个对象是否能绑定事件
     * @param {Object} obj
     */
    return function (obj) {
        return obj && (obj.addEventListener || obj.attachEvent);
    };
});
