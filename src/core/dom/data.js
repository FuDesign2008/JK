/**
 * 为Element提供数据存储功能
 * @author FuDesign2008@163.com
 * @date   2011-10-28
 * @time   下午04:00:23
 */


define(function (require) {
    var GUID = require('../obj/guid'),
        DATA_CACHE = require('../obj/dataCache'),
        ELEMENT = require('./element');
    //
    var bigCache = DATA_CACHE();

    return {
        /**
         * @param {HTMLElement} el
         * @param {String} name
         */
        get: function (el, name) {
            var guid,
                cache;
            el = ELEMENT(el);
            if (el) {
                guid = GUID.get(el);
                if (guid) {
                    cache = bigCache.get(guid);
                    if (cache) {
                        return cache.get(name);
                    }
                }
            }
        },
        /**
         * 获取该元素缓存数据的所有键和值
         * @param {HTMLElement} el
         * @return {Object}
         *              obj.key {Array}
         *              obj.val {Array}
         */
        getAll: function (el) {
            var guid,
                cache;
            el = ELEMENT(el);
            if (el) {
                guid = GUID.get(el);
                if (guid) {
                    cache = bigCache.get(guid);
                    if (cache) {
                        return cache.getAll(name);
                    }
                }
            }
        },
        /**
         * @param {HTMLElement} el
         * @param {String} name
         * @param {Any} data
         */
        set: function (el, name, data) {
            var guid,
                cache;
            el = ELEMENT(el);
            if (el) {
                guid = GUID.auto(el);
                if (guid) {
                    cache = bigCache.get(guid);
                    if (!cache) {
                        cache = DATA_CACHE();
                        bigCache.set(guid, cache);
                    }
                    cache.set(name, data);
                }
            }
        },
        /**
         * @param {HTMLElement} el
         * @param {String} name 缓存数据名称
         */
        clear: function (el, name) {
            var guid,
                cache;
            el = ELEMENT(el);
            if (el) {
                guid = GUID.get(el);
                if (guid) {
                    cache = bigCache.get(guid);
                    if (cache) {
                        cache.clear(name);
                    }
                }
            }
        },
        /**
         * 清除dom元素上的所有数据
         * @param {HTMLElement} el
         */
        clearAll: function (el) {
            var guid,
                cache;
            el = ELEMENT(el);
            if (el) {
                guid = GUID.get(el);
                if (guid) {
                    cache = bigCache.get(guid);
                    if (cache) {
                        cache.clearAll();
                    }
                }
            }
        }
    };
});
