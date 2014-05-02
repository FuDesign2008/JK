/**
 * 对于有getBoundingClientRect方法的浏览器，修复getBoundingClientRect在IE下的bug
 * 对于无该方法的浏览器，返回null
 * 建议使用该方法以代替原生的getBoundingClientRect方法
 *
 * IE, Firefox 3 and later, and Opera 9.5 and later offer a method called
 * getBoundingClientRect()  on each element, which returns a rectangle object
 * that has four properties:   left ,   top ,   right , and   bottom.
 * These properties give the location of the element on the page relative
 * to the viewport. The browser implementations are slightly different.
 * IE considers the upper - left corner of the document to be located at (2,2),
 * whereas the Firefox and Opera implementations use the traditional (0,0)
 * as the starting coordinates. This necessitates doing an initial check for
 * the location of an element positioned at (0,0), which will return (2,2)
 * in IE and (0,0) in other browsers.
 * 并非所有版本的IE下都return (2,2)
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-11
 * @time   上午10:34:52
 */




define(function (require) {
    var DOC_SCROLL = require('./docScroll'),
        ELEMENT = require('./element'),
        offset = false,
        fix = function () {
            var scrollTop = DOC_SCROLL().y,
                body = document.body,
                temp = document.createElement('div');
            temp.style.cssText = 'position:absolute;left:0;top:0;';
            body.appendChild(temp);
            //fix offset
            offset = -temp.getBoundingClientRect().top - scrollTop;
            body.removeChild(temp);
            temp = null;
        };
    /**
     * @param {HTMLElement} el
     * @param {Object}
     *
     */
    return function (el) {
        var rect;
        el = ELEMENT(el);
        if (!el) {
            return;
        }
        if (el.getBoundingClientRect) {
            if (offset === false) {
                fix();
                fix = null;
            }
            rect = el.getBoundingClientRect();
            return {
                top: rect.top + offset,
                right: rect.right + offset,
                bottom: rect.bottom + offset,
                left: rect.left + offset
            };
        }
    };
});

