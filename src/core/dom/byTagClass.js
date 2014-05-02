/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-25
 * @time   上午10:35:47
 */


define(function (require, exports) {
    var TO_ARRAY = require('../arr/toArray'),
        TYPE = require('../obj/type'),
        FOR_EACH = require('../arr/forEach'),
        CLASS_NAME = require('./className');
    /**
     *
     * @param {Document|HTMLElement} el
     * @param {String} tag  支持* 在IE7下，<object />.getElementsByTagName('*')
     *              是有bug的，
     *              见 http://blog.csdn.net/fudesign2008/article/details/6967583
     * @param {String} klass
     * @return {Array}
     */
    return function (el, tag, klass) {
        if (!el || !el.getElementsByTagName) {
            el = document;
        }
        if (!TYPE.isStr(tag)) {
            return [];
        }
        var arr = TO_ARRAY(el.getElementsByTagName(tag)),
            ret;
        if (!klass || !TYPE.isStr(klass)) {
            return arr;
        }
        ret = [];
        FOR_EACH(arr, function (elem) {
            if (CLASS_NAME.has(elem, klass)) {
                ret.push(elem);
            }
        });
        return ret;
    };
});
