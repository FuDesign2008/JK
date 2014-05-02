/**
 *  返回克隆的新数组
 */




define(function (require, exports) {
    /**
     * @param {Array} a 数组
     * @returns {Array}
     */
    return function (a) {
        return [].concat(a);
    };
});
