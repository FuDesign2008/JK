/**
 * 检测元素是否可见（与jQuery的 is(':visible')功能一致）
 *
 * 以下情况不可见
 * 1.当父元素display为none时
 * 2.当元素display为none时
 * 3.当元素的大小为0时
 *
 * 注意：以下情况都认为是可见的
 * 1.当本元素或父级元素visibility为hidden，
 * 2.父级元素overflow为hidden时，
 * 3.opacity为0
 * ......
 *
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-16
 * @time   下午09:01:58
 */


define(function (require) {
    var IS_TAG = require('./isTag'),
        ELEMENT = require('./element'),
        GET_STYLE = require('./getStyle'),
        /**
         * @param {HTMLElmemnt} el
         * @return {Boolean}
         */
        isHidden = function (el) {
            var w = el.offsetWidth,
                h = el.offsetHeight,
                force = IS_TAG(el, 'tr');
            if (w === 0 && h === 0 && !force) {
                return true;
            }
            if (w !== 0 && h !== 0 && !force) {
                return false;
            }
            return GET_STYLE(el, 'display') === 'none';
        };
    /**
     * @param {HTMLElmemnt} el
     * @return {Boolean}
     */
    return function (el) {
        el = ELEMENT(el);
        if (el) {
            return !isHidden(el);
        }
    };
});


