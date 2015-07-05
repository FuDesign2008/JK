/**
 *  判断两个对象的值是否相等
 *  1) 只判断对象本身拥有的属性
 * @author FuDesign2008@163.com
 * @date   2011-9-21
 * @time   上午11:35:02
 */


define(function (require) {
    var TYPE  = require('./type'),
        FOR_OWN = require('./forOwn'),
        isEqual;

    /***
     *
     * @param {Object} a
     * @param {Object} b
     */
    isEqual =  function (a, b) {
        var ret = true;

        if (!TYPE.isObj(a) || !TYPE.isObj(b)) {
            return false;
        }

        FOR_OWN(a, function (val, key) {
            var bOwn, bVal = b[key];
            if (TYPE.isObj(val) && TYPE.isObj(bVal)) {
                ret = isEqual(val, bVal);
                if (ret === false) {
                    //阻止 forOwn
                    return false;
                }
            } else {
                bOwn = b.hasOwnProperty(key);
                //NaN 被认为与自身相等，这与js语言本身的判断有一点不一样
                if (!bOwn || (bOwn && (val !== bVal && !(TYPE.isNum(val) &&
                        TYPE.isNum(bVal) && isNaN(val) &&
                        isNaN(bVal))))) {
                    ret = false;
                    //阻止 forOwn
                    return false;
                }
                // 等价的代码
                //if (bOwn) {
                //  if (!(val===bVal)) {
                //      if (TYPE.isNum(val) && TYPE.isNum(bVal) &&
                //      isNaN(val) && isNaN(bVal)) {
                //          // do nothing
                //      } else {
                //          ret = false;
                //          //阻止 forOwn
                //          return false;
                //      }
                //  }
                //} else {
                //  ret =false;
                //  //阻止 forOwn
                //  return false;
                //}
            }
        });
        if (ret) {
            FOR_OWN(b, function (val, key) {
                var aOwn, aVal = a[key];
                if (TYPE.isObj(val) && TYPE.isObj(aVal)) {
                    ret = isEqual(val, aVal);
                    if (ret === false) {
                        //阻止 forOwn
                        return false;
                    }
                } else {
                    aOwn = a.hasOwnProperty(key);
                    if (!aOwn || (aOwn && (val !== aVal && !(TYPE.isNum(val) &&
                            TYPE.isNum(aVal) && isNaN(val) &&
                            isNaN(aVal))))) {
                        ret = false;
                        //阻止 forOwn
                        return false;
                    }
                }
            });
        }
        //
        return ret;
    };

    return isEqual;
});
