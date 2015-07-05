/**
 * 提供统一的数据缓存
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-15
 * @time   下午07:32:34
 */


define(function (require) {
    var TYPE = require('./type'),
        FOR_OWN = require('./forOwn'),
        DESTROY = require('./destroy');
    return function () {
        var bigCache = {};

        return {
            /**
             * @param {String} name
             */
            get: function (name) {
                if (name && TYPE.isStr(name) && bigCache[name] != null) {
                    return bigCache[name];
                }
                return null;
            },
            /**
             * 获取所有的键和值
             * @return {Object}
             *      obj.key {Array}
             *      obj.val {Array}
             */
            getAll: function () {
                var keys = [],
                    vals = [];
                FOR_OWN(bigCache, function (val, key) {
                    vals.push(val);
                    keys.push(key);
                });
                return {
                    key: keys,
                    val: vals
                };
            },
            /**
             * @param {String} name
             * @param {Any} data
             */
            set: function (name, data) {
                if (name && TYPE.isStr(name)) {
                    bigCache[name] = data;
                }
            },
            clear: function (name) {
                if (name && TYPE.isStr(name)) {
                    delete bigCache[name];
                }
            },
            clearAll: function () {
                FOR_OWN(bigCache, function (val, key) {
                    delete bigCache[key];
                });
            },
            destroy: function () {
                var that = this;
                DESTROY({
                    target: bigCache
                });
                DESTROY({
                    target: that
                });
                that = bigCache = null;
            }
        };
    };
});
