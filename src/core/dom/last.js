


define(function (require) {
    var TYPE = require('../obj/type'),
        NODE_TYPE = require('./nodeType');
    /**
     * 返回子节点中倒数一个符合条件的节点
     * 默认返回子节点中倒数第一个HTMLElement
     * @param {Node}  node
     * @param {Function} filter [optional] 过滤器,
     * 默认是检查是否是元素节点是过滤器
     * @return {Object} 默认子节点中倒数第一个HTMLElement
     */
    return function (node, filter) {
        var first,
            // wrap NODE_TYPE.isElement for keyword `this`
            isElement = function (obj) {
                return NODE_TYPE.isElement(obj);
            };
        filter = TYPE.isFn(filter) ? filter : isElement;

        if (!node || !node.childNodes) {
            return null;
        }
        first = node.firstChild;
        while (first) {
            if (filter(first)) {
                return first;
            }
            first = first.nextSibling;
        }
    };
});
