/**
 * 销毁一般对象的方法
 * @author FuDesign2008@163.com
 * @date   2011-8-25
 * @time   下午01:08:56
 */



define(function (require) {
    var GET_TYPE = require('./getType'),
        FOR_OWN = require('./forOwn'),
        FOR_EACH = require('../arr/forEach'),
        IS_WIN = require('../dom/isWin'),
        IS_RAW = require('../event/isRaw'),
        /**
         * 内部使用
         * @param {Object} obj   type(obj) === 'object' 的对象
         */
        IS_DESTROY_ABLE_OBJ = function (obj) {
            if (obj.nodeType || IS_WIN(obj) || IS_RAW(obj)) {
                return false;
            }
            return true;
        },
        /**
         *
         * @param {Object} conf
         * @param {Object | Array} conf.target  【必须】要销毁的对象
         * @param {Boolean} conf.deep   【可选】是否深层销毁, 默认为false
         */
        destroy = function (conf) {
            if (!conf && !conf.target) {
                return;
            }
            //
            var fnSelf = destroy,
                target = conf.target,
                deep = conf.deep === true,
                type = GET_TYPE(target);
            //
            if (type === 'array') {
                if (deep) {
                    FOR_EACH(target, function (val, key) {
                        var type = GET_TYPE(val);
                        if (type === 'array' || (type === 'object' &&
                                IS_DESTROY_ABLE_OBJ(val))) {
                            fnSelf({
                                target: val,
                                deep: true
                            });
                        }
                        target[key] = null;
                    });
                }
                target.length = 0;
            }
            if (type === 'object' && IS_DESTROY_ABLE_OBJ(target)) {
                FOR_OWN(target, function (val, key) {
                    var type;
                    if (deep) {
                        type = GET_TYPE(val);
                        if (type === 'array' || (type === 'object' &&
                                IS_DESTROY_ABLE_OBJ(val))) {
                            fnSelf({
                                target: val,
                                deep: true
                            });
                        }
                    }
                    target[key] = null;
                    delete target[key];
                });
            }
            //
            target = conf = null;
        };
    //
    return destroy;
});
