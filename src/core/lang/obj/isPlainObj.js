/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-22
 * @time   下午04:37:53
 */


define(function (require) {
    var TYPE = require('./type'),
        IS_WIN = require('../dom/isWin'),
        IS_RAW = require('../event/isRaw'),
        HAS_OWN = Object.prototype.hasOwnProperty;

    return function (obj) {
        // Because of IE, we also have to check the presence of the constructor
        // property.  Make sure that DOM nodes and window objects don't pass
        // through, as well
        if (!obj || !TYPE.isObj(obj) || obj.nodeType || IS_WIN(obj) ||
                IS_RAW(obj)) {
            return false;
        }
        // Not own constructor property must be Object
        if (obj.constructor && !HAS_OWN.call(obj, 'constructor') &&
                !HAS_OWN.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        var key;
        /*jshint noempty: false*/
        for (key in obj) {
            //do nothing
        }

        return key === undefined || HAS_OWN.call(obj, key);
    };
});
