/**
 * 用于处理对象唯一标志符_guid
 * _guid的值为字符串，有的对象有，有的没有
 * 主要用于辅助 事件绑定与移除等等
 * 推荐使用 auto() 方法
 * @author FuDesign2008@163.com
 * @date   2011-9-27
 * @time   下午12:51:10
 */


define(function (require) {
    var TYPE = require('./type'),
        console = require('../debug/console'),
        UNIQUE = require('../math/unique');
    //
    return {
        /**
         *  自动设置guid
         *  推荐使用
         * @param {Object} obj
         * @return {String|Boolean} 返回成功设置guid,
         * 如果没有成功设置，返回false
         */
        auto: function (obj) {
            var that = this;
            if (that.has(obj)) {
                return obj._guid;
            }
            //有的对象，如IE的原生Event对象，就无法给其添加属性; number,
            //boolean是不能添加属性的
            try {
                obj._guid = 'guid_' + UNIQUE();
            } catch (ex) {
                return false;
            }
            return obj._guid;
        },
        /**
         * 判断一个对象是否已经拥有guid
         * @param {Object} obj
         * @return {Boolean}
         */
        has: function (obj) {
            if (!obj) {
                console.error('[core.obj.guid] has(): param can not be null !');
                return false;
            }
            var hasOwn = !!obj.hasOwnProperty;
            if (obj._guid && TYPE.isStr(obj._guid) &&
                    ((hasOwn && obj.hasOwnProperty('_guid')) || !hasOwn)) {
                return true;
            }
            return false;
        },
        /**
         * 获取对象的guid
         * @param {Object} obj
         * @return {String}
         */
        get: function (obj) {
            var that = this;
            if (that.has(obj)) {
                return obj._guid;
            }
            return false;
        },
        /**
         *
         * @param {Object} obj
         * @param {String} guid
         * @param {Boolean} force 是否强制设置guid, 默认为false
         * @return {String|Boolean}  是否成功设置guid
         */
        set: function (obj, guid, force) {
            var that = this,
                has;
            if (!obj || !TYPE.isStr(guid)) {
                return false;
            }
            has = that.has(obj);
            if (!has || (has && force === true)) {
                try {
                    obj._guid = guid;
                } catch (ex) {
                    return false;
                }
            }
            return obj._guid;
        }
    };
});
