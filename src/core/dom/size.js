/**
 *  计算一般HTMLElement元素的高度和宽度
 *  注意：文档尺寸和窗口尺寸见docSize, winSize
 *
 */


define(function (require) {
    var HIDDEN_CONTAINER = require('./hiddenContainer'),
        IS_VISIBLE = require('./isVisible'),
        GET_STYLE = require('./getStyle'),
        ELEMENT = require('./element'),
        GET_BOUNDING_CLIENT_RECT = require('./getBoundingClientRect'),
        kit = {
            //获取隐藏的元素及隐藏的父级元素
            getHidden: function (el) {
                var arr = [];
                if (!IS_VISIBLE(el)) {
                    do {
                        if (GET_STYLE(el, 'display') === 'none') {
                            arr.push(el);
                        }
                        el = el.parentNode;
                    } while (el);
                }
                return arr;
            },
            cal: function (el) {
                var size,
                    rect = GET_BOUNDING_CLIENT_RECT(el);
                if (rect) {
                    size = {
                        x: rect.right - rect.left,
                        y: rect.bottom - rect.top
                    };
                }
                return size || {
                    x: el.offsetWidth,
                    y: el.offsetHeight
                };
            },
            blank: function (els) {
                var i,
                    l = els.length,
                    el,
                    visibility = [];
                for (i = 0; i < l; i++) {
                    el = els[i];
                    visibility.push(GET_STYLE(el, 'visibility') || '');
                    el.style.visibility = 'hidden';
                    el.style.display = '';
                }
                return visibility;
            },
            unBlank: function (els, visibility) {
                var i,
                    l = els.length,
                    el;
                for (i = 0; i < l; i++) {
                    el = els[i];
                    el.style.display = 'none';
                    el.style.visibility = visibility[i];
                }
            },
            size: function (el) {
                var that = this,
                    ret,
                    arrV,
                    hidden = that.getHidden(el);
                // 如果是隐藏元素，或父级元素是隐藏元素
                if (hidden.length) {
                    arrV = that.blank(hidden);
                    ret = that.cal(el);
                    that.unBlank(hidden, arrV);
                } else {
                    ret = that.cal(el);
                }
                return ret;
            }
        };

    return function (el) {
        var ret;
        el = ELEMENT(el);
        if (!el) {
            return;
        }
        if (el.parentNode) {//已经在文档中
            ret = kit.size(el);
        } else {
            HIDDEN_CONTAINER.appendChild(el);
            ret = kit.size(el);
            HIDDEN_CONTAINER.removeChild(el);
        }
        return ret;
    };
});
