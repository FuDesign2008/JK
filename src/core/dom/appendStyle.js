/**
 * 将css style注入到稳定中
 * 1) 如果专门为IE编写代码，务必小心使用styleSheet.cssText属性，在重用同一个<style/>
 * 元素并再次设置这个属性时，有可能会导致浏览器崩溃。
 * @author FuDesign2008@163.com
 * @date   2011-9-27
 * @time   下午05:49:47
 *
 */


define(function (require) {
    var PARAM = require('../obj/param'),
        DOC = document,
        HEAD =  DOC.head || DOC.getElementsByTagName('head')[0] ||
            DOC.documentElement;

     /**
     *
     * @param {Object} conf
     * @param {String} conf.css  代码字符串
     * @param {String} conf.type  默认为text/css
     * @param {String} conf.media  默认为all
     */

    return function (conf) {
        conf = PARAM({
            css: '',
            type: 'text/css',
            media: 'all'
        }, conf);
        if (!conf.css) {
            return;
        }
        var css = DOC.createElement('style');
        css.type = conf.type;
        css.media = conf.media;
        try {// for not IE
            css.appendChild(document.createTextNode(conf.css));
        } catch (ex) {// for IE
            css.styleSheet.cssText = conf.css;
        }
        //jQuery的注释：
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        HEAD.insertBefore(css, HEAD.firstChild);
    };
});
