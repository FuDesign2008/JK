


define(function (require) {
    var TYPE = require('../obj/type'),
        NODE_TYPE = require('./nodeType'),
        PREV_ALL = require('./prevAll'),
        NEXT_ALL = require('./nextAll');
    /**
     * @param {Node}  node
     * @param {Function} filter [optional] 过滤器,
     * 默认是检查是否是元素节点是过滤器
     * @param {Array} 按照节点在文档中出现的先后顺序排列
     */
    return function (node, filter) {
        // wrap NODE_TYPE.isElement for keyword `this`
        var isElement = function (obj) {
                return NODE_TYPE.isElement(obj);
            };
        filter = TYPE.isFn(filter) ? filter : isElement;
        return PREV_ALL(node, filter).concat(NEXT_ALL(node, filter));
    };
});
