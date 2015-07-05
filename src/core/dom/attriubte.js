/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-14
 * @time   下午12:04:00
 */


define(function (require) {
    var FOR_OWN = require('../obj/forOwn'),
        GET_TYPE = require('../obj/getType'),
        FOR_EACH = require('../arr/forEach'),
        UA = require('../bom/ua'),
        fixed = {
            'for': 'htmlFor',
            'class': 'className',
            readonly: 'readOnly',
            maxlength: 'maxLength',
            cellspacing: 'cellSpacing',
            rowspan: 'rowSpan',
            colspan: 'colSpan',
            //tabindex: 'tabIndex',
            usemap: 'useMap',
            frameborder: 'frameBorder'
        };
    if (UA.IE) {
        //see http://blog.csdn.net/fudesign2008/article/details/6073394
        fixed.tabindex = 'tabIndex';
        fixed.style = 'cssText';
    } else {
        fixed.tabIndex = 'tabindex';
        fixed.cssText = 'style';
    }



    return {
        /**
         *
         * @param {Node} node
         * @param {String} prop
         * @param {Any} val 【可选】
         * @return {Boolean}
         */
        has: function (node, prop, val) {
            if (!node || !prop) {
                return false;
            }
            if (val == null) {
                return !!(node[prop] != null ||
                        (node.hasAttribute && node.hasAttribute(prop)));
            }
            return !!(node[prop] === val ||
                    (node.hasAttribute && node.hasAttribute(prop) === val));
        },
        /**
         *
         * @param {Node} node
         * @param {String|Array} prop
         * @return {Any|Object}
         */
        get: function (node, prop) {
            if (!node || !prop) {
                return null;
            }
            var ret,
                type = GET_TYPE(prop);
            if (type === 'string') {
                return node.getAttribute(fixed[prop] || prop);
            }
            if (type === 'array') {
                ret = {};
                FOR_EACH(prop, function (attr) {
                    ret[attr] = node.getAttribute(fixed[attr] || attr);
                });
                return ret;
            }
        },
        /**
         *
         * @param {Node} node
         * @param {Object} prop
         */
        set: function (node, prop) {
            if (!node || !prop) {
                return;
            }
            FOR_OWN(prop, function (val, attr) {
                node.setAttribute(fixed[attr] || attr, val);
            });
        },
        /**
         *
         * @param {Node} node
         * @param {String|Array} prop
         */
        remove: function (node, prop) {
            if (!node || !prop) {
                return;
            }
            var ret,
                type = GET_TYPE(prop);
            if (type === 'string') {
                return node.removeAttribute(fixed[prop] || prop);
            }
            if (type === 'array') {
                ret = {};
                FOR_EACH(prop, function (attr) {
                    ret[attr] = node.removeAttribute(fixed[attr] || attr);
                });
                return ret;
            }
        }
    };
});
