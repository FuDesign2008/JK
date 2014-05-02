/**
 * 传统对于文本框（input）的输入可通过键盘的
 * onkeydown / onkeypress / onkeyup 来监测，
 * 但在处理较多细节时存在诟病比如：
 *  cut（剪切） / paste（复制） / undo（撤销） / redo（重做）
 *  / drag & drop（拖拽）/ 输入法等。
 * 而 oninput & onpropertychange 事件基本可以解决上面的诟病
 * see  http://blog.csdn.net/fudesign2008/article/details/6925521
 *
 * 1) 支持多次绑定，但不支持命名空间
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-11
 * @time   下午06:12:04
 */


define(function (require) {
    var BIND = require('../../core/event/bind'),
        UNBIND = require('../../core/event/unbind'),
        IS_INPUT = require('../input.isInput'),
        NS = '.util_input_inputEvent',
        eventType = 'input',
        elInput = document.createElement('input');

    // for IE6/IE7/IE8
    if ('onpropertychange' in elInput) {
        eventType = 'propertychange';
    }
    elInput = null;
    //
    eventType += NS;



    return {
        /**
         *
         * @param {HTMLElement} el  可输入的元素
         * @param {Function} handler  事件监听器
         * @param {Object|Any} data 【可选】传递至事件监听器的数据
         */
        bind: function (el, handler, data) {
            if (IS_INPUT(el)) {
                BIND(el, eventType, handler, data);
            }
        },
        /**
         *
         * @param {HTMLElement} el  可输入的元素
         * @param {Function} handler  【可选】事件监听器，
         *        但不存在时，移除所有通过#bind()方法绑定的事件
         */
        unbind: function (el, handler) {
            if (IS_INPUT(el)) {
                UNBIND(el, eventType, handler);
            }
        }
    };
});
