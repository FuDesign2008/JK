/**
 * 只有IE系列浏览器原生支持mouseenter和mouseleave事件
 * hover组件用于支持跨浏览器的mouseenter和mouseleave事件
 * 1).使用hover.bind绑定的事件，只能用hover.unbind解除绑定
 * @author FuDesign2008@163.com
 * @date   2011-9-7
 * @time   下午03:34:15
 */



define(function (require) {
    var CONTAINS = require('../dom/contains'),
        UA = require('../bom/ua'),
        TYPE = require('../obj/type'),
        DATA_CACHE = require('../obj/dataCache'),
        GUID = require('../obj/guid'),
        ENCODE = require('../reg/encode'),
        IS_BINDABLE = require('./isBindable'),
        BIND = require('./bind'),
        UNBIND = require('./unbind'),
        dataCache = DATA_CACHE(),
        NS = '_core_event_hover',
        rType = /^mouse(enter|leave)(\.[a-zA-Z_\-\d]+)?$/;

    return {
        /**
         *
         * @param {Node} el  元素
         * @param {String} type  事件类型
         *                  事件的可能的类型是'mouseenter', 'mouseleave'
         *                  支持一级命名空间
         *                  命名空间默认为'._core_event_hover',
         *                  不支持多个类型
         * @param {Function} handler 监听函数
         * @param {Object} data  可选， 传递至监听函数的数据
         */
        bind: function (el, type, handler, data) {
            type = type || '';
            if (!IS_BINDABLE(el) || !type || !TYPE.isFn(handler) ||
                    !rType.test(type)) {
                return;
            }
            var handlerGuid = GUID.auto(handler),
                elGuid = GUID.auto(el),
                listener,
                cacheKey,
                arrCache;
            if (!UA.IE) {
                type = type.replace(/^mouseenter/i, 'mouseover');
                type = type.replace(/^mouseleave/i, 'mouseout');
                listener = function (fixedEvent, theData) {
                    var target = fixedEvent.target,
                        related = fixedEvent.relatedTarget;
                    if ((el === target && !CONTAINS(el, related)) ||
                    //target在内， related在外【碰见过该种情况】
                            (target !== el && related !== el &&
                            CONTAINS(el, target) && CONTAINS(related, el))) {
                        handler.apply(el, [fixedEvent, theData]);
                    }
                };
                GUID.set(listener, handlerGuid, true);
            } else {
                listener = handler;
            }
            type = type.indexOf('.') > -1 ? type + NS : type + '.' + NS;
            cacheKey = NS + elGuid;
            arrCache = dataCache.get(cacheKey) || [];
            arrCache.push(type);
            dataCache.set(cacheKey, arrCache);
            BIND(el, type, listener, data);
        },
        /**
         *
         * @param {Node} el  元素
         * @param {String} type 可选，事件类型，支持一级命名空间，默认为'._core_event_hover'，不支持多个类型
         * @param {Function} handler 可选, 监听函数
         */
        unbind: function (el, type, handler) {
            if (!IS_BINDABLE(el)) {
                return;
            }
            var elGuid = GUID.get(el),
                arr,
                i,
                dotIndex,
                pattern;
            if (!elGuid) {
                return false;
            }
            if (!type) {
                pattern = /.+/;
            } else {
                dotIndex = type.indexOf('.');
                if (dotIndex === 0) {//namespace only
                    pattern = new RegExp(ENCODE(type + NS) + '$', 'i');
                } else if (dotIndex === -1) {
                    //event type only, mouseleave or mouseenter
                    if (!UA.IE) {
                        type = type.replace(/^mouseenter/i, 'mouseover');
                        type = type.replace(/^mouseleave/i, 'mouseout');
                    }
                    pattern = new RegExp('^' + ENCODE(type), 'i');
                } else {// event type + namespace
                    if (!UA.IE) {
                        type = type.replace(/^mouseenter/i, 'mouseover');
                        type = type.replace(/^mouseleave/i, 'mouseout');
                    }
                    pattern = new RegExp('^' + ENCODE(type + NS) + '$', 'i');
                }
            }
            arr = dataCache.get(NS + elGuid);
            if (arr && arr.length) {
                for (i = arr.length - 1; i >= 0; i--) {
                    if (pattern.test(arr[i])) {
                        UNBIND(el, arr[i], handler);
                        arr.splice(i, 1);
                    }
                }
            }
        }
    };
});
