


define(function (require) {
    var TYPE = require('../obj/type');
    /**
     *  返回不含重复值的新数组
     * @param {Array} a 数值
     * @returns {Array}
     */
    return function (a) {
        if (!TYPE.isArr(a) || a.length < 2) {
            return a;
        }
        var i,
            j,
            l = a.length,
            ret = [ a[0] ];
        for (i = 1; i < l; i++) {
            for (j = 0; j < ret.length; j++) {
                if (a[i] !== ret[j]) {
                    ret.push(a[i]);
                }
            }
        }
        return ret;
    };
});
