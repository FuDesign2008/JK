/**
 * 用于绑定只触发一次的事件【即，触发一次该事件后，事件监听器立即被移除】
 * @author FuDesign2008@163.com
 * @date   2011-11-1
 * @time   上午11:44:10
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        GUID = require('../obj/guid'),
        IS_BINDABLE = require('./isBindable'),
        BIND = require('./bind'),
        UNBIND = require('./unbind');

    /**
     * 参数同 core/event/bind
     */
    return function (el, types, handler, data) {
        if (!IS_BINDABLE(el) || !TYPE.isFn(handler)) {
            return;
        }
        var guid = GUID.auto(handler),
            listener = function (fixedEvent, dataObj) {
                var fnSelf = listener;
                //to unbind binded handler
                UNBIND(el, types, fnSelf);
                // to run old hanlder
                handler.apply(el, [fixedEvent, dataObj]);
            };
        GUID.set(listener, guid, true);
        BIND(el, types, listener, data);
    };
});
