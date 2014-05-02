/**
 *  索引数组( returns the index of the given item's first occurrence),
 *               JavaScript 1.6 新增方法
 * @returns {Integer} 返回索引，未找到返回-1
 */



define(function (require, exports) {
    /**
     * @param {Array}
     *            a 数值
     * @param {Object}
     *            val 值
     * @param {Integer}
     *            i [可选] 从第i个开始查找, 默认为0
     *
     */
    return Array.prototype.indexOf ? function (a, val, i) {
        return a.indexOf(val, i);
    } : function (a, val, i) {
        var l = a.length;
        i = i || 0;
        for (i = 0; i < l; i++) {
            if (a[i] === val) {
                return i;
            }
        }
        return -1;
    };
});
