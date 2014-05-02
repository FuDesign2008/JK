/**
 *  dom过滤器，可配合dot.arr.filter一起使用
 * @example
 *              var divNode = ELEMENT('div_id');
 *              var kids = CHILDREN(divNode);
 *              //create Selector object
 *              var errorInputSelector = SELECTOR('input[type=text].error');
 *              var errorInputs = FOR_EACH(kids, function (el) {
 *                  return errorInputSelector.test(el);
 *              });
 *
 *
 */


define(function (require) {
    var PARAM = require('../obj/param'),
        IS_TAG = require('./isTag'),
        CLASS_NAME = require('./className'),
        ATTRIBUTE = require('./attribute'),
        rTag = /([a-z]+)/i,
        rClass = /\.([\-_a-z\d]+)/i,
        rAttr = /\[([^=]+)=?([^\]]+)?\]/;


    /**
     * @param {Object} conf 属性有
     * @param {String} conf.tag
     * @param {String} conf.className
     * @param {String} conf.attr
     * @param {String} conf.attrVal
     */
    function Selector(conf) {
        this._conf = PARAM({
            tag: null,
            className: null,
            attr: null,
            attrVal: null
        }, conf);
    }

    /**
     * @param {Object} el
     * @return {Boolean}
     */
    Selector.prototype.test = function (el) {
        var conf = this._conf;
        if (!el || !el.nodeType) {
            return false;
        }
        return !!((conf.tag && IS_TAG(el, conf.tag)) ||
            (conf.className && CLASS_NAME.has(el, conf.className)) ||
            (conf.attr && ATTRIBUTE.has(el, conf.attr, conf.attrVal)) ||
            false);

    };

    /**
     * @param {String}  selector 支持的格式为 'tag', '.className', '[attr]',
     *            '[attr=value]'的单个异类的组合，例如： 'span.error-hint',
     *            'input[type=button]', 'input[checked]',
     *            '[type=button].submit_btn'
     * @returns {Selector}
     */
    return function (selector) {
        selector = String(selector);
        var tag,
            className,
            attr,
            attrVal,
            matched = rAttr.exec(selector);
        //
        if (matched && matched[1]) {
            attr = matched[1];
            attrVal = matched[2] || null;
            selector = selector.replace(rAttr, '');
        }
        matched = rClass.exec(selector);
        if (matched && matched[1]) {
            className = matched[1];
            selector = selector.replace(rClass, '');
        }
        matched = rTag.exec(selector);
        if (matched && matched[1]) {
            tag = matched[1];
        }
        if (tag || className || attr) {
            return new Selector({
                tag: tag,
                className: className,
                attr: attr,
                attrVal: attrVal
            });
        }
    };
});
