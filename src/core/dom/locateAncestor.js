/**
 *  获取一般的HTMLElement相对于祖先级的位置
 * @author FuDesign2008@163.com
 * @date   2011-9-16
 * @time   下午03:17:30
 */


define(function (require) {
    var IS_ANCESTOR = require('./isAncestor'),
        LOCATE_DOC = require('./locateDoc'),
        ELEMENT = require('./element');
    /**
     * @param {HTMLElement} el
     * @param {HTMLElement} ancestor
     * @return {Object}
     */
    return function (el, ancestor) {
        el = ELEMENT(el);
        ancestor = ELEMENT(el);
        if (!el || !ancestor || !IS_ANCESTOR(el, ancestor)) {
            return;
        }
        el = LOCATE_DOC(el);
        ancestor = LOCATE_DOC(ancestor);
        if (el && ancestor) {
            return {
                x: ancestor.x - el.x,
                y: ancestor.y - el.y
            };
        }
    };
});
