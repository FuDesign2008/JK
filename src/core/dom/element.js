


define(function () {
    /**
     * 1.可根据id返回dom元素，
     * 2.也可以过滤一个对象(字符串除外,如果是字符串，尝试作为id寻找)
     *   是否是HTMLElmemnt元素
     * @param {any}  o
     * @returns {HTMLElmemnt}
     */
    return function (o) {
        if (typeof o === 'string') {
            return document.getElementById(o);
        }
        if (o && o.nodeType === 1) {
            return o;
        }
    };
});
