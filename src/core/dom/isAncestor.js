/**
 *  是否是父级/祖先级元素
 * 1) 元素不是自身的父级元素， 这与core/dom/contains有一点不同
 * @author FuDesign2008@163.com
 * @date   2011-9-16
 * @time   下午05:16:41
 */


define(function (require, exports) {
    var CONTAINS = require('./contains'),
        NODE_TYPE = require('./nodeType');
    /**
     *
     * @param {Node} node
     * @param {Node} ancestor
     * @return {Boolean}
     */
    return function (node, ancestor) {
        if (!node || !ancestor || !node.parentNode ||
                !NODE_TYPE.isNode(node) || !NODE_TYPE.isNode(ancestor)) {
            return false;
        }
        if (ancestor === node) {//元素不是自身的父级元素
            return false;
        }
        return CONTAINS(ancestor, node);
    };
});
