/**
 * 用于动态创建HTMLElement,
 * 强烈推荐使用该函数(core/dom/createElement)替代document.createElement
 *
 * 1) 在IE7及更早版本中，直接使用document.createElement动态创建元素会有问题
 *      a.不能设置动态创建的iframe的name属性
 *      b.不能通过表单的reset()方法重设动态创建的input元素
 *      c.动态创建的type为'reset'的button元素重设不了表单
 *      d.动态创建的一批name相同的单选按钮彼此毫无联系。
 *  如果将一些属性写在conf中进行配置，core/dom/createElement()方法可以避免
 *  以上的bug，因此，强烈推荐使用conf
 * 2) IE和w3c对opacity的值各有一套标准，core/dom/createElement 按 w3c 标准
 * 3) 对于script, style元素，请使用core/dom/appendScript()，core/style/appendStyle()方法
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-17
 * @time   下午09:22:06
 */



define(function (require) {
    var FOR_OWN = require('../obj/forOwn'),
        TYPE = require('../obj/type'),
        SET_STYLE = require('./setStyle'),
        ATTRIBUTE = require('./attribute'),
        UA = require('../bom/ua');

    /**
     *
     * @param {String} tagName
     * @param {Object} conf 【可选】配置选项
     *                  {
     *                      attribute: {}  //{Object}
     *                      style: {}  // {Object} style的值按照html规范
     *                      innerText: ''  // {String}
     *                  }
     */

    return function (tagName, conf) {
        //Starting with Gecko 19.0 (Firefox 19.0) createElement(null) works
        //like createElement("null"). Note that Opera stringifies null as well,
        //but Chrome and Internet Explorer will both throw errors.
        //@see
        //https://developer.mozilla.org/en-US/docs/DOM/document.createElement
        if (!tagName) {
            return null;
        }
        var node,
            html;
        tagName = String(tagName).toLowerCase();
        if (!conf || !TYPE.isObj(conf)) {
            return document.createElement(tagName);
        }
        //如果有conf
        if (UA.IE) {
            html = ['<' + tagName];
            if (conf.attribute) {
                FOR_OWN(conf.attribute, function (val, key) {
                    html.push(' ' + key + '="' + val + '"');
                });
            }
            if (conf.style) {
                html.push(' style="');
                FOR_OWN(conf.style, function (val, key) {
                    if (String(key).toLowerCase() === 'opacity') {
                        html.push('filter:alpha(opacity=' + (val * 100) + ')');
                        return;
                    }
                    html.push(key + ':' + val + ';');
                });
                html.push('"');
            }
            html.push(' \/>');
            node = document.createElement(html.join(''));
            if (conf.innerText) {
                node.innerText = String(conf.innerText);
            }
        } else {
            node = document.createElement(node);
            FOR_OWN(conf, function (val, key) {
                var temp;
                if (key === 'innerText') {
                    temp = document.createTextNode(String(val));
                    node.appendChild(temp);
                } else if (key === 'attribute') {
                    ATTRIBUTE.set(node, val);
                } else if (key === 'style') {
                    SET_STYLE(node, val);
                }
            });
        }

        return node;
    };
});
