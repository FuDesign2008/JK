/**
 *  获取不在文档流的HTMLElement(position为relative或absolute)相对于其offsetParent的位置
 *
 *  1) 只有不在文档流的HTMLElement可以使用这个方法
 *
 *  2) 这个方法类似core/dom/locateAncestor(el.offsetParent, el)，
 *  但是locateOffsetParent效率更高
 *
 *  3) offsetParent returns a reference to the object which is the closest
 *  (nearest in the containment hierarchy) positioned containing element.
 *  If the element is non-positioned, the nearest table cell or root element
 *  (html in standards compliant mode; body in quirks rendering mode) is the
 *  offsetParent. offsetParent returns null when the element has style.display
 *  set to 'none'. The offsetParent is useful because offsetTop and offsetLeft
 *  are relative to its padding edge.
 *
 *  >>>> see more infomation about 'offsetParent'
 *  -> http://www.web666.net/dom/offsetParent.html
 *  -> https://developer.mozilla.org/en/DOM/element.offsetParent
 *  -> http://msdn.microsoft.com/en-us/library/ms534302(VS.85).aspx
 *
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-16
 * @time   下午03:17:30
 *
 */


define(function (require) {
    var GET_STYLE = require('./getStyle'),
        ELEMENT = require('./element');
    /**
     * @param {HTMLElement} el
     * @return {Object}
     *              obj.x {Integer}
     *              obj.y {Integer}
     */
    return function (el) {
        el = ELEMENT(el);
        if (!el) {
            return null;
        }
        var offsetParent,
            temp1,
            temp2,
            leftX = parseFloat(GET_STYLE(el, 'left'), 10),
            topY = parseFloat(GET_STYLE(el, 'top'), 10),
            leftNaN = isNaN(leftX),
            topNaN = isNaN(topY);

        if (leftNaN || topNaN) {
            if (leftNaN) {
                leftX = 0;
            }
            if (topNaN) {
                topY = 0;
            }
            offsetParent = el.offsetParent;
            if (offsetParent) {
                if (offsetParent.getBoundingClientRect) {
                    temp1 = offsetParent.getBoundingClientRect();
                    temp2 = el.getBoundingClientRect();
                    return {
                        x: temp2.left - temp1.left,
                        y: temp2.top - temp1.top
                    };
                }
                temp1 = el;
                do {
                    if (leftNaN) {
                        leftX += temp1.offsetLeft;
                    }
                    if (topNaN) {
                        topY += temp1.offsetTop;
                    }
                    temp1 = temp1.parentNode;
                } while (temp1 && temp1 !== offsetParent);
            }
            if (isNaN(leftX)) {
                leftX = 0;
            }
            if (isNaN(topY)) {
                topY = 0;
            }
        }
        //
        return {
            x: leftX,
            y: topY
        };
    };
});
