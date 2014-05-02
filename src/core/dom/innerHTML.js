/**
 * 用于获取与设置元素的innerHTML，推荐使用
 * 1) 设置时，可配置是否移除子节点的事件[使用core.event.bind()方法绑定的]
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-28
 * @time   上午09:55:23
 */



define(function (require) {
    var PARAM = require('../obj/param'),
        TYPE = require('../obj/type'),
        ELEMENT = require('./element'),
        CLEAN_DESCENT = require('./cleanDescent');
    /**
     * @param {Object} conf
     * @param {HTMLElement} conf.target
     * @param {String} conf.html    【可选】，没有时表示getter, 有时表示setter
     * @param {Boolean} conf.cleanDescent  设置innerHTML前，是否移除子节点
     * 的所有事件，默认为true。需要提高性能时，可以根据情况配置tag, klass,
     * 或设置为false
     * @param {String} conf.tag     【可选】默认为"*"，要移除事件的后代节点的tag
     * @param {String} conf.klass   【可选】要移除事件的后代节点的类名
     */
    return function (conf) {
        if (!conf || !conf.target) {
            return;
        }
        conf = PARAM({
            target: null,
            html: null,
            cleanDescent: true,
            tag: "*",
            klass: null
        }, conf);
        //
        var el = ELEMENT(conf.target);
        if (!el) {
            return;
        }
        //setter
        if (TYPE.isStr(conf.html)) {
            if (conf.cleanDescent !== false) {
                CLEAN_DESCENT(conf);
            }
            el.innerHTML = conf.html;
        } else {
            //getter
            return el.innerHTML;
        }
    };
});
