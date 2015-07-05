/**
 * 自定义事件的once, bind, unbind, fire方法
 * 1) 事件类型不区分大小写，默认为小写
 * @author FuDesign2008@163.com
 * @date   2011-9-9
 * @time   上午11:10:22
 */



define(function (require) {
    var TYPE = require('../obj/type'),
        ENCODE = require('../reg/encode'),
        FOR_OWN = require('../obj/forOwn'),
        DESTROY = require('../obj/destroy'),
        GUID = require('../obj/guid'),
        FOR_EACH = require('../arr/forEach'),
        START_WITH = require('../str/startWith'),
        console = require('../debug/console'),
        CUSTOM_EVENTS = '_core_event_custom',
        rTypeNS = /^[a-z_\-\d]+(\.[a-z_\-\d]+)?$/i,
        rType = /^[a-z_\-\d]+$/i;
    return {
        /**
         *
         * @param {Object} obj 事件的对象
         * @param {String} type 事件类型，支持一级命名空间，但不支持多个类型
         * @param {Function} handler 监听函数
         * @param {Any} data 可选，传送至监听函数的数据
         */
        once: function (obj, type, handler, data) {
            type = (type || '').toLowerCase();
            if (!obj || !type || !rTypeNS.test(type) || !TYPE.isFn(handler)) {
                console.error('[core/event/custom] once(): illegal params!');
                return;
            }
            var that = this,
                guid = GUID.auto(handler),
                listener = function () {
                    var fnSelf = listener;
                    that.unbind(obj, type, fnSelf);
                    handler.apply(obj, arguments);
                };
            GUID.set(listener, guid, true);
            that.bind(obj, type, listener, data);
        },
        /**
         *
         * @param {Object} obj 事件的对象
         * @param {String} type 事件类型，支持一级命名空间，但不支持多个类型
         * @param {Function} handler 监听函数
         * @param {Any} data 可选，传送至监听函数的数据
         */
        bind: function (obj, type, handler, data) {
            type = (type || '').toLowerCase();
            if (!obj || !type || !rTypeNS.test(type) || !TYPE.isFn(handler)) {
                console.error('[core.event.custom] bind(): illegal params!');
                return;
            }
            var customEvents,
                guid = GUID.auto(handler);
            if (!guid) {
                return;
            }
            if (!obj[CUSTOM_EVENTS]) {
                obj[CUSTOM_EVENTS] = {};
            }
            customEvents = obj[CUSTOM_EVENTS];
            if (!customEvents[type]) {
                customEvents[type] = {};
            }
            if (!customEvents[type][guid]) {
                customEvents[type][guid] = [];
            }
            customEvents[type][guid].push({
                fn: handler,
                dt: data || null
            });
        },
        /**
         *
         * @param {Object} obj 事件的对象
         * @param {String} type 可选，事件类型，支持一级命名空间，但不支持多个类型
         * @param {Function} handler 可选，监听函数
         */
        unbind: function (obj, type, handler) {
            if (!obj || !obj[CUSTOM_EVENTS]) {
                return;
            }
            var customEvents = obj[CUSTOM_EVENTS],
                isFn = TYPE.isFn(handler),
                guid = null,
                pattern,
                dotIndex;
            if (handler && (!isFn || !GUID.has(handler))) {
                return;
            }
            if (isFn) {
                guid = GUID.get(handler);
            }
            if (!type) {
                pattern = /.+/;
            } else {
                type = String(type).toLowerCase();
                dotIndex = type.indexOf('.');
                if (dotIndex === 0) {// namespace only
                    pattern = new RegExp('^[a-z_\-\d]+' + ENCODE(type) + '$');
                } else if (dotIndex === -1) {// event only
                    pattern = new RegExp('^' + ENCODE(type) +
                            '(\.[a-z_\-\d]+)?$');
                } else {// event + namespace
                    pattern = new RegExp('^' + ENCODE(type) + '$');
                }
            }
            FOR_OWN(customEvents, function (objHandlers, theType) {
                if (pattern.test(theType) && objHandlers) {
                    if (guid) {//需要核对监听器
                        FOR_OWN(objHandlers, function (arrHandlers, id) {
                            if (id === guid) {
                                delete objHandlers[guid];
                            }
                        });
                    } else {
                        DESTROY({
                            target: objHandlers
                        });
                        objHandlers = null;
                        delete customEvents[theType];
                    }
                }
            });
        },
        /**
         *
         * @param {Object} obj 事件的对象
         * @param {String} type 事件类型，不支持命名空间（与core.event.fire保持一致）
         */
        fire: function (obj, type) {
            type = (type || '').toLowerCase();
            if (!obj || !obj[CUSTOM_EVENTS] || !rType.test(type)) {
                return;
            }
            var customEvents = obj[CUSTOM_EVENTS],
                typeDot = type + '.';
            FOR_OWN(customEvents, function (objHandlers, theType) {
                if (theType === type || START_WITH(theType, typeDot)) {
                    if (objHandlers) {
                        FOR_OWN(objHandlers, function (arrHandlers/*, guid*/) {
                            FOR_EACH(arrHandlers, function (handlerObj) {
                                handlerObj.fn.apply(obj, [{
                                    type: type,
                                    isCustom: true
                                }, handlerObj.dt]);
                            });
                        });
                    }
                }
            });
        }
    };
});
