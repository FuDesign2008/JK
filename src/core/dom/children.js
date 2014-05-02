


define(function (require, exports) {
    var TYPE = require('../obj/type');
    /**
     * 根据条件获取所有符合条件的子元素节点
     * 默认获取所有的子元素节点
     * 比node.children的优点，断开了动态引用
     * @param {Node}  node
     * @param {Function} filter [optional] 过滤器,
     * @return {Array}  按照在文档中出现的先后顺序排列
     */
    return function (node, filter) {
        var index,
            len,
            children,
            retArr = [],
            isNode = function (node, index) {
                return true;
            };
        filter = TYPE.isFn(filter) ? filter : isNode;
        if (!node || !node.children) {
            return retArr;
        }
        children = node.children;
        len = children.length;
        for (index = 0; index < len; index++) {
            if (filter(children[index], index)) {
                retArr.push(children[index]);
            }
        }
        return retArr;
    };
});
