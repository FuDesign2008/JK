/**
 *  事件分发类,以实现自定义事件,
 *
 *
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        FOR_EACH = require('../arr/forEach');
    //
    //
    return {
        /**
         *
         * @param {String} type
         * @param {Function} handler
         * @param {Object} context
         * @returns
         */
        on: function (type, handler, context) {
            var that = this,
                events = that._events = that._events || {};
            if (!type || !TYPE.isFn(handler)) {
                return;
            }
            events[type] = events[type] || [];
            events[type].push({
                fn: handler,
                ctx: context || null
            });
        },
        /**
         *
         * @param {String} type
         * @param {Function} handler
         * @returns
         */
        off: function (type, handler) {
            var that = this,
                events = that._events = that._events || {},
                handlers,
                j;
            if (!type) {
                that._events = {};
                return;
            }
            if (TYPE.isFn(handler)) {
                handlers = events[type];
                if (handlers && handlers.length) {
                    for (j = handlers.length - 1; j >= 0; j--) {
                        /*jshint maxdepth: 4*/
                        if (handlers[j] === handler) {
                            handlers.splice(j, 1);
                        }
                    }
                }
            } else {
                delete events[type];
            }
        },
        /**
         * 按照绑定顺序先后触发
         *
         * @param {String} type
         */
        trigger: function (type) {
            var that = this,
                events = that._events = that._events || {},
                args;
            if (!type) {
                return;
            }
            args = arguments.slice(1);
            FOR_EACH(events[type], function (item) {
                item.fn.apply(item.ctx, args);
            });
        }
    };
});
