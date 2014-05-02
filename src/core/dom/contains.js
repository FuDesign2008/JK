/**
 *  判断一个元素是否包含另一个元素（元素可包含自身）
 * @author FuDesign2008@163.com
 * @date   2011-9-8
 * @time   上午11:13:37
 */


define(function (require) {
    var UA = require('../bom/ua'),
        NODE_TYPE = require('./nodeType');
    /**
     *
     * @param {Node} node
     * @param {Node} otherNode
     * @return {Boolean} The return value is `true` if `otherNode` is a
     * descendent of `node`, or `node` itself. Otherwise the return value is
     * `false`.
     */
    return function (node, otherNode) {
        if (!node || !otherNode || !NODE_TYPE.isNode(node) ||
                !NODE_TYPE.isNode(otherNode)) {
            return false;
        }
        //IE, chrome, opera 8+, safari 3+
        //safari 2.x实现了contains方法，但有bug
        //@see https://developer.mozilla.org/en-US/docs/DOM/Node.contains
        if (node.contains && (!UA.WEBKIT || UA.WEBKIT >= 522)) {
            return node.contains(otherNode);
        }
        /*jslint maxlen: 200*/
        //@see https://developer.mozilla.org/en-US/docs/DOM/Node.compareDocumentPosition
        if (node.compareDocumentPosition) {//FF
            /*jslint bitwise: true*/
            return !!(node.compareDocumentPosition(otherNode) & 16);
        }
        //others
        do {
            if (node === otherNode) {
                return true;
            }
            otherNode = otherNode.parentNode;
        } while (otherNode);

        return false;
    };
});
