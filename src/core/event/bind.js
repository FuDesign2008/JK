/**
 *  绑定事件
 *  1).支持一级命名空间，支持多个事件用空格分割一起绑定
 *  2).支持多次绑定相同事件
 *  3).支持this关键字指向绑定对象【未必等于event.target】
 *  4).传送的event对象均为core.event.event下的fixedEvent对象
 *  5).事件监听器中使用的fixedEvent在监听程序运行完成后会自动销毁，
 *     如果监听器中有异步代码，请在执行异步代码前引用fixedEvent的属性
 *  6).事件类型（不含命名空间）必须为小写
 */



define(function (require) {
    var TYPE = require('../obj/type'),
        FOR_EACH = require('../arr/forEach'),
        EVENT = require('./event'),
        ADD = require('./add'),
        IS_BINDABLE = require('./isBindable'),
        GUID = require('../obj/guid');
    /**
     *
     * @param {Node} el 事件对象，支持window, document
     * @param {String} types 事件类型，支持一级域名，支持多个类型
     *              例  'click.page  mouseover.global'
     * @param {Function} handler 事件监听器
     * @param {Any} data  可选，传递至事件监听器的数据，任意值
     */
    return function (el, types, handler, data) {
        if (!IS_BINDABLE(el) || !TYPE.isFn(handler)) {
            return;
        }
        types = String(types).split(/\s+/);
        var goodTypes = [],
            guid,
            eventHandler;
        FOR_EACH(types, function (val) {
            if (/^[a-z]+(\.[a-z_\-\d]+)?$/i.test(val)) {
                goodTypes.push(val);
            }
        });
        if (!goodTypes.length) {
            return;
        }
        guid = GUID.auto(handler);
        if (!guid) {
            return;
        }
        //一般事件的监听函数
        eventHandler = function (raw) {
            raw = raw || window.event;
            var fixedEvent = EVENT(raw);
            handler.apply(el, [fixedEvent, data]);
            if (fixedEvent && fixedEvent.destroy) {
                fixedEvent.destroy();
                fixedEvent = null;
            }
        };
        //
        if (!el._eventHandlers) {
            el._eventHandlers = {};
        }
        FOR_EACH(goodTypes, function (type) {
            var dotIndex;
            if (!el._eventHandlers[type]) {
                el._eventHandlers[type] = {};
            }
            if (!el._eventHandlers[type][guid]) {
                el._eventHandlers[type][guid] = [];
            }
            el._eventHandlers[type][guid].push(eventHandler);
            dotIndex = type.indexOf('.');
            type = (dotIndex > -1) ? type.substring(0, dotIndex) : type;
            ADD(el, type, eventHandler);
        });
        //
        el = null;
    };
});
