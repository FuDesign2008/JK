


define(function (require) {
    var TYPE = require('../obj/type'),
        NODE_TYPE = require('./nodeType');

    /**
     * 返回节点前面的所有符合条件的节点
     * 默认返回节点前面的所有HTMLElement
     * @param {Node}  node
     * @param {Function} filter [optional] 过滤器,
     * 默认是检查是否是元素节点是过滤器
     * @return {Array}  按照在文档中出现的先后顺序排列
     */
    return function (node, filter) {
        var ret = [],
            // wrap NODE_TYPE.isElement for keyword `this`
            isElement = function (obj) {
                return NODE_TYPE.isElement(obj);
            };
        filter = TYPE.isFn(filter) ? filter : isElement;
        while (node && node.previousSibling) {
            node = node.previousSibling;
            if (filter(node)) {
                ret.push(node);
            }
        }
        return ret.length ? ret.reverse() : [];
    };
});
