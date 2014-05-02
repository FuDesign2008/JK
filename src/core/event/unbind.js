/**
 *  移除事件
 *  1).支持一级命名空间，支持一次性移除多个事件
 *  例如 unbind(el, 'click.namespaceA  mouseover.namespaceB')
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        FOR_OWN = require('../obj/forOwn'),
        GUID = require('../obj/guid'),
        FOR_EACH = require('../arr/forEach'),
        ENCODE = require('../reg/encode'),
        REMOVE = require('../event/remove'),
        IS_BINDABLE = require('./isBindable');
    return function (el, types, handler) {
        if (!IS_BINDABLE(el)) {
            return;
        }
        var guid = null,
            isFn = TYPE.isFn(handler),
            eHandlers,
            goodTypes;
        if (handler && (!isFn || !GUID.has(handler))) {
            return;
        }
        if (isFn) {
            guid = GUID.get(handler);
        }
        eHandlers = el._eventHandlers;
        if (!eHandlers) {
            return;
        }
        goodTypes = [];
        if (types) {
            types = String(types).split(/\s+/);
            FOR_EACH(types, function (val) {
                if ((/^[a-z]+(\.[a-z_\-\d]+)?$/i.test(val)) ||
                        (/^([a-z]+)?\.[a-z_\-\d]+$/i.test(val))) {
                    goodTypes.push(val);
                }
            });
            if (!goodTypes.length) {
                return;
            }
            FOR_EACH(goodTypes, function (gType) {
                var dotIndex = gType.indexOf('.'), pattern;
                if (dotIndex === 0) {//only namespace
                    pattern = new RegExp('^([a-zA-Z]+)?' + ENCODE(gType) + '$');
                } else if (dotIndex === -1) {//only event
                    pattern = new RegExp('^' + ENCODE(gType) +
                            '(\.[a-zA-Z_\-\d]+)?$');
                } else {// evnet + namespace
                    pattern = new RegExp('^' + ENCODE(gType) + '$');
                }
                FOR_OWN(eHandlers, function (obj, typeNS) {
                    if (obj && pattern.test(typeNS)) {
                        var iDot = typeNS.indexOf('.');
                        typeNS = (iDot > -1) ?
                                typeNS.substring(0, iDot) : typeNS;
                        FOR_OWN(obj, function (arr, gID) {
                            var i;
                            if (guid === null || guid === gID) {
                                if (arr && arr.length) {
                                    for (i = arr.length - 1; i >= 0; i--) {
                                        REMOVE(el, typeNS, arr[i]);
                                        arr.splice(i, 1);
                                    }
                                }
                            }
                        });
                    }
                });
            });
        } else {// to bind all
            FOR_OWN(eHandlers, function (obj, typeNS) {
                if (obj) {
                    var dotIndex = typeNS.indexOf('.');
                    typeNS = (dotIndex > -1) ?
                            typeNS.substring(0, dotIndex) : typeNS;
                    FOR_OWN(obj, function (arr) {
                        var i;
                        if (arr && arr.length) {
                            for (i = arr.length - 1; i >= 0; i--) {
                                REMOVE(el, typeNS, arr[i]);
                                arr.splice(i, 1);
                            }
                        }
                    });
                }
            });
            el._eventHandlers = null;
        }
        // Nullify el to prevent memory leaks in IE
        el = null;
    };
});
