/**
 * 对简单的js对象(比如json数据对象)进行克隆
 *
 * @author FuDesign2008@163.com
 * @date   2011-12-13
 * @time   下午03:58:03
 */


define(function (require, exports) {
    var GET_TYPE =  require('./getType'),
        FOR_OWN = require('./forOwn'),
        IS_PLAIN_OBJ = require('./isPlainObj'),
        clone = function (obj) {
            var type = GET_TYPE(obj),
                ret,
                fnSelf = clone;
            if (type === "object" && IS_PLAIN_OBJ(obj)) {
                ret = {};
                FOR_OWN(obj, function (val, prop) {
                    ret[prop] = fnSelf(val);
                });
                return ret;
            }
            if (type === "array") {
                return [].concat(obj);
            }
            return obj;
        };

    return clone;
});
