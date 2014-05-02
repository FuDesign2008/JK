/**
 * 将html字符串插入el节点子元素的最后面
 *
 */


define(function (require, exports) {
    var INSERT_HTML = require('./insertHTML');
    /**
     * @param {HTMLElement}
     *            el
     * @param {String}
     *            html
     */
    return function (el, html) {
        return INSERT_HTML(el, html, 'beforeEnd');
    };
});
