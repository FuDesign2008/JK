/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-12-21
 * @time   下午02:59:01
 */


define(function (require) {

    var INSERT = require('./insert');
    /**
     * @param {Node} node
     * @param {Node} newNode
     * @param {String} where  不区分大小写, 取值可为
     *              BeforeBegin, AfterBegin, BeforeEnd, AfterEnd
     */
    return function (node, newNode, where) {
        if (!node || !newNode || !where) {
            return;
        }
        switch (String(where).toLowerCase()) {
        case 'beforebegin':
            INSERT(newNode).before(node);
            break;
        case 'afterbegin':
            if (node.firstChild) {
                INSERT(newNode).before(node.firstChild);
            } else if (node.appendChild) {
                node.appendChild(newNode);
            }
            break;
        case 'beforeend':
            if (node.appendChild) {
                node.appendChild(newNode);
            }
            break;
        case 'afterend':
            INSERT(newNode).after(node);
            break;
        }
    };
});
