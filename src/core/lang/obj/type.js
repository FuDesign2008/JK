/**
 * 基本的类型判断
 * @author FuDesign2008@163.com
 * @date   2011-9-28
 * @time   上午11:25:59
 */


define(function (require) {
    var GET_TYPE = require('./getType');

    return {
        isArr: function (obj) {
            return GET_TYPE(obj) === 'array';
        },
        isBool: function (obj) {
            //优先检测文本形式
            return (typeof obj === 'boolean') || GET_TYPE(obj) === 'boolean';
        },
        isDate: function (obj) {
            return GET_TYPE(obj) === 'date';
        },
        isFn: function (obj) {
            return GET_TYPE(obj) === 'function';
        },
        isNull: function (obj) {
            //优先检测文本形式
            return obj === null || GET_TYPE(obj) === 'null';
        },
        isNum: function (obj) {
            //优先检测文本形式
            return typeof obj === 'number' || GET_TYPE(obj) === 'number';
        },
        isObj: function (obj) {
            return GET_TYPE(obj) === 'object';
        },
        isReg: function (obj) {
            return GET_TYPE(obj) === 'regexp';
        },
        isStr: function (obj) {
            //优先检测文本形式
            return typeof obj === 'string' || GET_TYPE(obj) === 'string';
        },
        isUndef: function (obj) {
            return GET_TYPE(obj) === 'undefined';
        }
    };
});
