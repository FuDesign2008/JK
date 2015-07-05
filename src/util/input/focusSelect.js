/**
 * 在Webkit内核的浏览器中，鼠标移入TextInput和TextArea元素，元素获取焦点(focus)后,
 * mouseup事件也触发，mouseup事件的默认行为会阻止选择文本。
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-24
 * @time   下午06:05:54
 */



define(function (require) {
    var BIND = require('../../core/event/bind'),
        UNBIND = require('../../core/event/unbind'),
        PARAM = require('../../core/obj/param'),
        WEBKIT = require('../../core/bom/ua.WEBKIT'),
        IS_INPUT = require('../input.isInput'),
        UNIQUE = require('../../core/math/unique'),
        NS = '.util_input_focusSelect_' + UNIQUE(),
        FOCUS = 'focus' + NS,
        MOUSE_UP = 'mouseup' + NS;
    /**
     * @class FocusSelect
     * @constructor
     */
    function FocusSelect(conf) {
        this._init(conf);
    }
    /**
     * @private
     * @param {Object} conf
     * @param {HTMLElement} conf.input 顶级容器，为input或textarea元素
     */
    FocusSelect.prototype._init = function (conf) {
        var that = this;
        that._conf = PARAM({
            input: null
        }, conf);
        that._enable = true;
        that._bindEvents();
    };
    /**
     * @private
     */
    FocusSelect.prototype._bindEvents = function () {
        var that = this,
            input = that._conf.input;
        //unbind events, to prevent binding more than once
        UNBIND(input, NS);
        if (WEBKIT) {
            BIND(input, MOUSE_UP, function (fixedEvent) {
                fixedEvent.preventDefault();
            });
        }
        BIND(input, FOCUS, function () {
            if (that._enable) {
                input.select();
            }
        });
    };
    /**
     * @public
     */
    FocusSelect.prototype.enable = function () {
        this._enable = true;
    };
    /**
     * @public
     */
    FocusSelect.prototype.disable = function () {
        this._enable = false;
    };
    /**
     * @public
     */
    FocusSelect.prototype.destroy = function () {
        var that = this,
            input = that._conf.input;
        //unbind events
        UNBIND(input, NS);
    };
    /**
     * @see FocusSelect#_init()
     * @return {FocusSelect|Null}
     */
    return function (conf) {
        if (!conf || !IS_INPUT(conf.input)) {
            return null;
        }
        return new FocusSelect(conf);
    };
});
