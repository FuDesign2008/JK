


define(function (require, exports) {
    var TYPE = require('../obj/type'),
        NODE_TYPE = require('./nodeType');
    /**
     * 返回节点后面第一个符合条件的节点
     * 默认返回节点后面第一个HTMLElement
     * @param {Node}  node
     * @param {Function} filter [optional] 过滤器,
     * 默认是检查是否是元素节点是过滤器
     * @return {Object} 默认返回节点的后一个HTMLElement
     */
    return function (node, filter) {
        // wrap NODE_TYPE.isElement for keyword `this`
        var isElement = function (obj) {
            return NODE_TYPE.isElement(obj);
        };
        filter = TYPE.isFn(filter) ? filter : isElement;
        while (node && node.nextSibling) {
            node = node.nextSibling;
            if (filter(node)) {
                return node;
            }
        }
    };
});
