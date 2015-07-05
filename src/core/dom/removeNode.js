/**
 * @author FuDesign2008@163.com
 * @date   2011-8-23
 * @time   上午09:39:27
 */


define(function (require) {
    var NODE_TYPE = require('./nodeType'),
        INSERT = require('./insert');
    /**
     *
     * 移除节点自身.
     * 1. IE/Opera支持Node.removeNode()
     * 2. FF/Chrome/Safari不支持该方法，故兼容之
     * @see Node.removeNode http://help.dottoro.com/ljxjnsic.php
     * @param {Node} node
     * @param {Boolean} removeChildren 默认为true
     * @return {Node} node itself
     */
    return function (node, removeChildren) {
        if (!NODE_TYPE.isNode(node)) {
            return;
        }
        removeChildren = removeChildren !== false;
        if (node.removeNode) {
            return node.removeNode(node, removeChildren);
        }
        if (node.parentNode && node.parentNode.removeChild) {
            if (!removeChildren) {
                while (node.firstChild) {
                    INSERT(node.firstChild).before(node);
                }
            }
            return node.parentNode.removeChild(node);
        }
    };
});
