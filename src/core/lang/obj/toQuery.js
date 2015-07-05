/**
 *  仅仅对key/value对象进行处理
 * @author FuDesign2008@163.com
 * @date   2011-10-25
 * @time   下午03:38:48
 */


define(function (require) {

    var FOR_OWN = require('./forOwn'),
        IS_PLAIN_OBJ = require('./isPlainObj'),
        /**
         * @param {Object} obj key/value对象
         * @param {Boolean} encode 是否对key/value使用encodeURIComponent进行编码，默认为true
         */
        toQuery = function (obj, encode) {
            var fnSelf = toQuery,
                ret = [];
            //
            encode = encode !== false;
            FOR_OWN(obj, function (val, key) {
                if (IS_PLAIN_OBJ(val)) {
                    ret.push(fnSelf(val, encode));
                } else {
                    val = (val == null) ? '' : val;
                    ret.push(encode ? (encodeURIComponent(key) + '=' +
                                encodeURIComponent(val)) : (key + '=' + val));
                }
            });
            return ret.join('&');
        };

    return toQuery;
});
