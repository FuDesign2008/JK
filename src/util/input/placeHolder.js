/**
 * 实现HTML5的placeholder功能
 * 1.不支持命名空间（因为没有必要）
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-25
 * @time   下午04:45:54
 */




define(function (require) {
    var PARAM = require('../../core/obj/param'),
        DESTROY = require('../../core/obj/destroy'),
        BIND = require('../../core/event/bind'),
        UNBIND = require('../../core/event/unbind'),
        ACTIVE = require('../../core/dom/active'),
        GET_STYLE = require('../../core/dom/getStyle'),
        SET_STYLE = require('../../core/dom/setStyle'),
        IS_INPUT = require('./isInput'),
        UNIQUE = require('../../core/math/unique'),
        NS = '.util_input_placeHolder' + UNIQUE(),
        FOCUS = 'focus' + NS,
        BLUR = 'blur' + NS,
        INPUT = 'input' + NS;
    /**
     * @class
     * @contructor
     * @param {Object} conf
     * @param {HTMLElement} conf.input  要实现placeholder功能的input或textarea元素
     * @param {String} conf.hint 提示文字，即html的placeholder属性。
     *     若为空，查询input的placeholder属性。
     *     若无该属性，默认为 '提示文字...'
     * @param {String} conf.color   正常文字颜色,格式同css的格式，默认为'#666666'
     * @param {String} conf.hintColor   提示状态文字颜色,格式同css的格式，默认为'#CCCCCC'
     */
    function PlaceHolder(conf) {
        this._init(conf);
    }
    /**
     * @private
     * @see PlaceHolder
     */
    PlaceHolder.prototype._init = function (conf) {
        var that = this,
            temp;
        that._conf = PARAM({
            input: null,
            hint: null,
            color: '#666666',
            hintColor: '#CCCCCC'
        }, conf);
        conf = that._conf;
        if (!conf.hint) {
            temp = conf.input.getAttribute('placeholder');
            if (temp) {
                conf.hint = temp;
                conf.input.setAttribute('placeholder', '');
            } else {
                conf.hint = '提示文字...';
            }
        }
        /**
         * @private
         * @type {Function}
         */
        that._focusHandler = null;
        /**
         * @private
         * @type {Function}
         */
        that._blurHandler = null;
        that._bindEvents();
        that._initTarget();
    };
    /**
     * @private
     */
    PlaceHolder.prototype._bindEvents = function () {
        var that = this,
            conf = that._conf,
            input = conf.input;
        that._focusHandler = function () {
            that._focus();
        };
        that._blurHandler = function () {
            that._blur();
        };
        BIND(input, FOCUS, that._focusHandler);
        BIND(input, BLUR, that._blurHandler);
        BIND(input, INPUT, that._focusHandler);
    };
    /**
     * @private
     */
    PlaceHolder.prototype._initTarget = function () {
        var that = this,
            input = that._conf.input,
            focused;
        input.value = '';
        focused = ACTIVE();
        if (focused === input) {
            input.blur();
        } else {
            that._blur();
        }
    };
    /**
     * @private
     */
    PlaceHolder.prototype._focus = function () {
        var that = this,
            conf = that._conf,
            input = conf.input;
        if (input.value === conf.hint) {
            input.value = '';
        }
        SET_STYLE(input, 'color', conf.color);
    };
    /**
     * @private
     */
    PlaceHolder.prototype._blur = function () {
        var that = this,
            conf = that._conf,
            input = conf.input,
            value = input.value;
        if (value === conf.hint || !value) {
            input.value = conf.hint;
            SET_STYLE(input, 'color', conf.hintColor);
        } else {
            SET_STYLE(input, 'color', conf.color);
        }
    };
    /**
     * @public
     * @return {String}
     */
    PlaceHolder.prototype.getHint = function () {
        return this._conf.hint;
    };
    /**
     * @public
     */
    PlaceHolder.prototype.destroy = function () {
        var that = this,
            conf = that._conf,
            input = conf.input;
        UNBIND(input, NS);
        SET_STYLE(input, 'color', conf.color);
    };

    /**
     * @see PlaceHolder
     * @return {PlaceHolder|Null}
     */
    return function (conf) {
        if (!conf || !IS_INPUT(conf.input)) {
            return null;
        }
        return new PlaceHolder(conf);
    };

});
