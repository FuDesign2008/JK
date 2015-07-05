/**
 *  获取一般的HTMLElement相对于文档的位置
 * @author FuDesign2008@163.com
 * @date   2011-9-16
 * @time   下午03:17:30
 */


define(function (require) {
    var IS_VISIBLE = require('./isVisible'),
        ELEMENT = require('./element'),
        DOC_SCROLL = require('./docScroll'),
        GET_BOUNDING_CLIENT_RECT = require('./getBoundingClientRect');
    /**
     * @param {HTMLElement} el
     * @return {Object}
     */
    return function (el) {
        el = ELEMENT(el);
        if (!el || !el.parentNode || !IS_VISIBLE(el)) {
            return;
        }
        //支持getBoundingClientRect的版本比较高的浏览器
        var rect = GET_BOUNDING_CLIENT_RECT(el),
            docScroll,
            ret,
            parent;
        if (rect) {
            docScroll = DOC_SCROLL(el);
            return {
                x: rect.left + docScroll.x,
                y: rect.top + docScroll.y
            };
        }
        //较老的浏览器, 需要优化(计算position:relative之类会出错吗？)
        ret = {
            x: el.offsetLeft,
            y: el.offsetHeight
        };
        parent = el.parentNode;
        /*不能为document*/
        while (parent && parent.nodeType === 1) {
            ret.x += parent.offsetLeft;
            ret.y += parent.offsetTop;
            parent = parent.parentNode;
        }
        return ret;
    };
});
