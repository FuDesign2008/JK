/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-1
 * @time   下午12:17:24
 */


define(function (require) {
    var GET_TYPE =  require('./getType');
    /**
     * 类似each, fn的执行值为false时，不再继续进行
     * @param {Object} obj
     * @param {Function} fn
     *
     */
    return function (obj, fn) {
        var ret, prop;
        if (GET_TYPE(obj) === 'object' && GET_TYPE(fn) === 'function' &&
                obj.hasOwnProperty) {
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    ret = fn(obj[prop], prop);
                    /*jshint maxdepth: 4*/
                    if (ret === false) {
                        return;
                    }
                }
            }
        }
    };
});
