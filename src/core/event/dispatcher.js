/**
 *  事件分发类,以实现自定义事件,
 *  a.支持一级命名空间
 * @example
 *       var dispatcher = reuire('core/event/dispatcher');
 *       dispatcher.bind('click', function (data) {
 *              //do something
 *       });
 *       dispatcher.bind('click.blackHat', function (data) {
 *              //do something
 *       });
 *       dispatcher.bind('focus.blackHat', function (data) {
 *              //do something
 *       });
 *       dispatcher.bind('click.greenHat', function (data) {
 *              //do something
 *       });
 *      dispatcher.fire('click.blackHat');//触发blackHat命名空间下的click事件
 *      //触发所有click事件，包括click, click.blackHat,click.greenHat
 *      dispatcher.fire('click');
 *      //触发blackHat命名空间下的所有事件，包括click.blackHat, focus.blackHat
 *      dispatcher.fire('.blackHat');
 *      //移除blackHat命名空间下的click事件
 *      dispatcher.fire('click.blackHat');
 *      //移除所有的click事件，包括click, click.blackHat, click.greenHat
 *      dispatcher.unbind('click');
 *      //移除blackHat命名空间下的所有事件，包括click.blackHat, focus.blackHat
 *      dispatcher.unbind('.blackHat');
 *
 *
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        ENCODE = require('../reg/encode'),
        FOR_OWN = require('../obj/forOwn'),
        FOR_EACH = require('../arr/forEach');
    //
    var events = {},
        getTypes = function (type) {
            type = String(type);
            if (!type) {
                return;
            }
            var types = [],
                index = type.indexOf('.'),
                pattern;
            if (index > -1) {
                if (index === 0) {//only namespace
                    pattern = new RegExp('[a-zA-Z_\-\d]+\.' + ENCODE(type) +
                            '$');
                } else {//event + namespace
                    return !!events[type] ? [type] : null;
                }
            } else {//only event
                pattern = new RegExp('^' + ENCODE(type) +
                        '(\.[a-zA-Z_\-\d]+)?$');
            }
            FOR_OWN(events, function (handlers, type) {
                if (pattern.test(type) && handlers) {
                    types.push(type);
                }
            });
            return types.length ? types : null;
        };
    //
    return {
        /**
         *
         * @param {String}
         *            type
         * @param {Function}
         *            handler
         * @returns
         */
        bind: function (type, handler) {
            var reg = /^[a-zA-Z_\-\d]+(\.[a-zA-Z_\-\d]+)?$/;
            type = type || '';
            if (!type || !TYPE.isFn(handler) || !reg.test(type)) {
                return;
            }
            events[type] = events[type] || [];
            events[type].push(handler);
        },
        /**
         *
         * @param {String}
         *            type
         * @param {Function}
         *            handler
         * @returns
         */
        unbind: function (type, handler) {
            var types = getTypes(type);
            if (!types) {
                return;
            }
            if (TYPE.isFn(handler)) {
                FOR_EACH(types, function (type) {
                    var handlers = events[type],
                        j;
                    if (handlers && handlers.length) {
                        for (j = handlers.length - 1; j >= 0; j--) {
                            if (handlers[j] === handler) {
                                handlers.splice(j, 1);
                            }
                        }
                    }
                });
            } else {
                FOR_EACH(types, function (type) {
                    events[type] = null;
                });
            }
        },
        unbindAll: function () {
            events = {};
        },
        /**
         * 按照绑定顺序先后触发
         *
         * @param {String} type
         * @param {Object} opts
         *                 opts.that  回调函数中的this指向的对象
         *                 opts.data  回调函数的参数
         */
        fire: function (type, opts) {
            var types = getTypes(type),
                that = opts.that || null;
            if (!types) {
                return;
            }
            opts = opts || {};
            FOR_EACH(types, function (type) {
                var handlers = events[type];
                if (handlers && handlers.length) {
                    FOR_EACH(handlers, function (fn) {
                        fn.apply(that, [opts.data]);
                    });
                }
            });
        }
    };
});
