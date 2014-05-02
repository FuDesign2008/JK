/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-16
 * @time   下午02:32:24
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        TRIM = require('../str/trim'),
        ENCODE = require('../reg/encode'),
        ELEMENT = require('./element'),
        // 好的命名className必须符合以下正则表达式
        RCLASS = /^[\-_a-z\d]+$/i;
    //
    return {
        /**
         *
         * @param {HTMLElement} element html元素
         * @param {String} className
         * @returns {Boolean}
         */
        has: function (element, className) {
            element = ELEMENT(element);
            if (!element || !className || !TYPE.isStr(className) ||
                    !RCLASS.test(className)) {
                return false;
            }
            return new RegExp(' ' + className + ' ').test(' ' +
                element.className + ' ');
        },
        /**
         *
         * @param {HTMLElement} element
         * @param {String} className
         */
        add: function (element, className) {
            var that = this,
                klass;
            element = ELEMENT(element);
            if (element) {
                if (!className || TYPE.isStr(className) ||
                        !RCLASS.test(className)) {
                    return;
                }
                if (that.has(element, className)) {
                    return;
                }
                klass = TRIM(element.className);
                element.className = klass ?
                        (klass + ' ' + className) : className;
            }
        },
        /**
         *
         * @param {HTMLElement} element html元素
         * @param {String} className
         */
        remove: function (element, className) {
            element = ELEMENT(element);
            if (!element || !className || !TYPE.isStr(className) ||
                    !RCLASS.test(className)) {
                return;
            }
            /*jslint regexp: true*/
            className = String(element.className).replace(
                new RegExp('^|\s+' + ENCODE(className) + '\s+|$', 'g'),
                ' '
            );
            element.className = TRIM(className);
        }
    };
});
