/**
 *  不去扩展Date, RegExp ,Node， window等原生对象
 * @author FuDesign2008@163.com
 * @date   2011-8-17
 * @time   下午08:15:20
 */



define(function (require) {
    var TYPE = require('./type'),
        IS_WIN = require('../dom/isWin'),
        IS_RAW = require('../event/isRaw'),
        CLONE = require('../arr/clone'),
        IS_EXTEND_ABLE_OBJ = function (obj) {
            if (!obj || !TYPE.isObj(obj) || obj.nodeType || IS_WIN(obj) ||
                    IS_RAW(obj)) {
                return false;
            }
            return true;
        },
        /**
         *
         * @param {Object} conf
         * @param {Object} conf.base 基本的
         * @param {Array|Object} conf.over
         *                      这些对象的属性会覆盖base的属性，
         *                      如果这些对象的属性为null或undefined,则忽略
         * @param {Array | Object} conf.extend
         *                      这些对象的属性会扩展base的属性,
         *                      如果这些对象的属性为null或undefined,则忽略
         * @param {Boolean} conf.deep
         *                      是否深如对象拷贝
         *                      【注意：只拷贝数组，不深入数组内部的对象】，
         *                      默认为true
         * @param {Boolean} conf.proto
         *                      是否拷贝对象prototype上的属性，
         *                      否则拷贝对象hasOwnProperty的属性,
         *                      默认为false
         */
        /*jshint maxstatements: 36, maxcomplexity: 35*/
        extendFn = function (conf) {
            if (!conf || !IS_EXTEND_ABLE_OBJ(conf.base) ||
                    (!conf.over && !conf.extend)) {
                return null;
            }
            var deep = conf.deep !== false,
                proto = conf.proto === true,
                base = conf.base,
                over = TYPE.isArr(conf.over) ? conf.over : [conf.over],
                extend = TYPE.isArr(conf.extend) ? conf.extend : [conf.extend],
                fnSelf = extendFn,
                //
                i,
                l = over.length,
                obj,
                p;
            //
            for (i = 0; i < l; i++) {
                obj = over[i];
                if (!TYPE.isObj(obj)) {
                    for (p in base) {
                        /*jshint maxdepth: 7*/
                        if (obj[p] != null) {
                            if (IS_EXTEND_ABLE_OBJ(base[p])) {
                                if (deep) {
                                    if (TYPE.isObj(obj[p]) &&
                                            (!proto ||
                                            (proto && obj.hasOwnProperty(p)))) {
                                        base[p] = fnSelf({
                                            base: base[p],
                                            over: [obj[p]],
                                            deep: true,
                                            proto: proto
                                        });
                                    }
                                } else {
                                    if (!proto ||
                                            (proto && obj.hasOwnProperty(p))) {
                                        base[p] = TYPE.isArr(obj[p]) ?
                                                CLONE(obj[p]) : obj[p];
                                    }
                                }
                            } else {
                                if (!proto ||
                                        (proto && obj.hasOwnProperty(p))) {
                                    base[p] = TYPE.isArr(obj[p]) ?
                                            CLONE(obj[p]) : obj[p];
                                }
                            }
                        }
                    }
                }
            }
            l = extend.length;
            //
            for (i = 0; i < l; i++) {
                obj = extend[i];
                if (TYPE.isObj(obj)) {
                    for (p in obj) {
                        if (obj[p] != null) {
                            if (TYPE.isObj(obj[p])) {
                                if (deep) {
                                    if (base[p] == null &&
                                            (!proto ||
                                            (proto && obj.hasOwnProperty(p)))) {
                                        base[p] = {};
                                    }
                                    if (IS_EXTEND_ABLE_OBJ(base[p])) {
                                        base[p] = fnSelf({
                                            base: base[p],
                                            extend: [obj[p]],
                                            deep: true,
                                            proto: proto
                                        });
                                    }
                                } else {
                                    if (base[p] === undefined &&
                                            (!proto ||
                                            (proto && obj.hasOwnProperty(p)))) {
                                        base[p] = TYPE.isArr(obj[p]) ?
                                                CLONE(obj[p]) : obj[p];
                                    }
                                }
                            } else {
                                if (base[p] === undefined &&
                                        (!proto ||
                                        (proto && obj.hasOwnProperty(p)))) {
                                    base[p] = TYPE.isArr(obj[p]) ?
                                            CLONE(obj[p]) : obj[p];
                                }
                            }
                        }
                    }
                }
            }
            return base;
        };
    //
    return extendFn;
});
