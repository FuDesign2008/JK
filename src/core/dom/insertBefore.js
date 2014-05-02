


define(function (require, exports) {
    /**
     * @param {Node} newNode
     * @param {Node} node
     *
     */
    return function (newNode, node) {
        var parent = node.parentNode;
        if (parent) {
            return;
        }
        if (parent.insertBefore) {
            parent.insertBefore(newNode, node);
        }
    };
});
