/**
 *  根据 索引或值 删除数组元素
 */



define(function (require, exports) {
    /**
     * @param {Array} arr 数组
     * @param {Integer} index 索引或值, 默认为索引
     * @param {Boolean} byValue 根据索引(false)或值(true)， 默认为false
     * @return {Array} 返回原数组
     */
    return function (arr, index, byValue) {
        if (!arr || !arr.length) {
            return arr;
        }
        var i;
        if (byValue === true) {
            i = arr.length - 1;
            for (i; i >= 0; i--) {
                if (arr[i] === index) {
                    arr.splice(i, 1);
                }
            }
        } else {
            if (index >= 0 && index < arr.length) {
                arr.splice(index, 1);
            }
        }
        return arr;
    };
});
