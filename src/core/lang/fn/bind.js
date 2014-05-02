/**
 * @author FuDesign2008@163.com
 * @date   2011-12-16
 * @time   下午03:00:54
 * @see https://developer.mozilla.org/en/JavaScript/Reference
 *     /Global_Objects/Function/bind
 * @see http://msdn.microsoft.com/en-us/library/ff841995%28v=vs.94%29.aspx
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        console = require('../debug/console'),
        SLICE = Array.prototype.slice,
        NATIVE_BIND = Function.prototype.bind,
        Blank = function () {};
    /**
     * @param {Function} fn
     * @param {Object} context
     * @return {Function}
     *
     */
    return function (fn, context) {
        if (TYPE.isFn(fn)) {
            console.error("[core/fn/bind] param -> fn is not function !");
            return;
        }
        var bound,
            args;
        if (fn.bind === NATIVE_BIND && NATIVE_BIND) {
            return NATIVE_BIND.apply(fn, SLICE.call(arguments, 1));
        }
        args = SLICE.call(arguments, 2);
        bound = function () {
            if (!(this instanceof bound)) {
                return fn.apply(context, args.concat(SLICE.call(arguments)));
            }
            Blank.prototype = fn.prototype;
            var selfObj = new Blank(),
                result = fn.apply(selfObj, args.concat(SLICE.call(arguments)));
            if (TYPE.isObj(result)) {
                return result;
            }
            return selfObj;
        };
        return bound;
    };
});
