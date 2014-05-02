


define(function (require) {
    var TYPE = require('../obj/type');
    /**
     * 根据条件获取所有符合条件的子节点
     * 默认获取所有的子节点
     * 比node.childNodes的优点，断开了动态引用
     * @param {Node}  node
     * @param {Function} filter [optional] 过滤器,
     * @return {Array}  按照在文档中出现的先后顺序排列
     */
    return function (node, filter) {
        var index,
            len,
            childNodes,
            retArr = [],
            isNode = function (node, index) {
                return true;
            };
        filter = TYPE.isFn(filter) ? filter : isNode;
        if (!node || !node.childNodes) {
            return retArr;
        }
        childNodes = node.childNodes;
        len = childNodes.length;
        for (index = 0; index < len; index++) {
            if (filter(childNodes[index], index)) {
                retArr.push(childNodes[index]);
            }
        }
        return retArr;
    };
});
