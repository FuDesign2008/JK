/**
 *  从尾巴开始索引数组( returns the index of the given item's last
 *               occurrence.), JavaScript 1.6 新增方法
 * @returns {Integer} 返回索引，未找到返回-1
 */



define(function () {
    /**
     * @param {Array}
     *            a 数值
     * @param {Object}
     *            val 值
     * @param {Integer}
     *            i [可选] 从第i个开始查找, 默认为从数组最后一个开始
     */
    return Array.prototype.lastIndexOf ? function (a, val, i) {
        return a.lastIndexOf(val, i || a.length);
    } : function (a, val, i) {
        var l = a.length;
        i = i || l;
        i = i < l ? i : l;
        for (i; i >= 0; i--) {
            if (a[i] === val) {
                return i;
            }
        }
        return -1;
    };
});
