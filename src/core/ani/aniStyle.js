/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-2
 * @time   下午06:05:39
 */


define(function (require) {
    var PARAM = require('../obj/param'),
        TYPE = require('../obj/type'),
        FOR_EACH = require('../arr/forEach'),
        ELEMENT = require('../dom/element'),
        GET_STYLE = require('../dom/getStyle'),
        SET_STYLE = require('../dom/setStyle'),
        TWEEN = require('./tween'),
        rColor = /color/i,
        num2Color = function (n) {
            //16777216 = 0xFFFFFF +1
            n = (Math.floor(n) % 16777216).toString(16);
            return '#000000'.substring(0, 7 - n.length) + n;
        },
        /**
         * @param {HTMLElement} el
         * @param {Object} obj
         *              obj.style
         *              obj.start
         *              obj.end
         *              obj.unit
         */
        checkCss = function (el, obj) {
            var val,
                n,
                style = obj.style;

            if (obj.start == null) {
                val = GET_STYLE(el, style);
                if (val.indexOf('#') === 0) {// color
                    val = parseInt(val.substr(1), 16);
                } else {
                    n = parseFloat(val, 10);
                    if (isNaN(n)) {
                        n = parseFloat(val.replace(/[^\.\d\e]+/gi, ''), 10);
                    }
                }
                if (isNaN(n)) {
                    n = 0;
                }
                obj.start = n;
            }
        };

    /**
     * @param conf {Object}
     * @param {HTMLElement} conf.target  【必须】要应用动画效果的HTMLElement
     * @param {String} conf.type    【可选】算法类型，默认为 'linear'
     *
     * @param {Object|Array} conf.css   【必须】
     * @param {String} conf.css.style  【必须】CSS属性名称
     * @param {Number} conf.css.start  【可选】初始值，如果没有，自动去获取
     * @param {Number} conf.css.end    【必须】目标值
     * @param {String} conf.css.unit   【可选】CSS属性值的单位，默认为''
     *
     * @param {Integer} conf.fps     【可选】帧频，默认为30 fps
     * @param {Number} conf.time       【可选】持续时间,默认为 1.5 s
     * @param {Boolean} conf.autoPlay   【可选】 是否自动播放动画，默认为true
     * @param {Function} conf.onTween   【可选】 正在运行动画的回调
     * @param {Function} conf.onComplete   【可选】动画结束的回调
     * @return {Object} ani/tween()返回的对象;
     */
    return function (conf) {
        conf = PARAM({
            target: null,
            type: 'linear',
            css: null,
            autoPlay: true,
            fps: 30,
            time: 1.5,
            onTween: null,
            onComplete: null
        }, conf);
        var target = ELEMENT(conf.target),
            css = conf.css,
            isArrCss,
            cssLen,
            indexCss,
            start,
            end,
            style,
            unit,
            onTween,
            isFnOnTween;
        if (!target || !css) {
            return;
        }
        isArrCss = TYPE.isArr(css);
        onTween = conf.onTween;
        isFnOnTween = TYPE.isFn(onTween);

        if (isArrCss) {
            cssLen = css.length;
            start = [];
            end = [];
            style = [];
            unit = [];
            FOR_EACH(css, function (val) {
                checkCss(target, val);
                start.push(val.start);
                end.push(val.end);
                style.push(val.style);
                unit.push(val.unit || '');
            });
        } else {
            checkCss(target, css);
            start = css.start;
            end = css.end;
            style = css.style;
            unit = css.unit || '';
        }
        return TWEEN({
            type: conf.type,
            start: start,
            end: end,
            fps: conf.fps,
            time: conf.time,
            onTween: function (val) {
                if (isArrCss) {
                    for (indexCss = 0; indexCss < cssLen; indexCss++) {
                        SET_STYLE(target,
                            style[indexCss],
                            rColor.test(style[indexCss]) ?
                                    num2Color(val[indexCss]) : (val[indexCss] +
                                    unit[indexCss])
                                );
                    }
                } else {
                    SET_STYLE(target,
                        style,
                        rColor.test(style) ? num2Color(val) : (val + unit)
                        );
                }
                if (isFnOnTween) {
                    onTween(val);
                }
            },
            onComplete: conf.onComplete
        });
    };
});
