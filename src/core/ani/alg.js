/**
 *  easing算法
 *  see
 *  http://www.robertpenner.com/easing/
 *  http://www.cnblogs.com/cloudgamer/archive/2009/01/06/Tween.html
 *  for more
 * @author FuDesign2008@163.com
 * @date   2011-11-2
 * @time   上午10:41:25
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        alg = {
            /**
             *
             * @param {Integer} t  current time（当前计算次数）
             * @param {Number} b  beginning value（初始值）
             * @param {Number} c  change in value（变化量）
             * @param {Integer} d  duration（总共计算次数）
             */
            linear: function (t, b, c, d) {
                return c * t / d + b;
            },
            easeInQuad: function (t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * (--t * (t - 2) - 1) + b;
            },
            easeInCubic: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOutCubic: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            easeInQuart: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOutQuart: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOutQuart: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            easeInQuint: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOutQuint: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOutQunit: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t * t + b;
                }
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            },
            easeInSine: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOutSine: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOutSine: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            },
            easeInExpo: function (t, b, c, d) {
                return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOutExpo: function (t, b, c, d) {
                return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOutExpo: function (t, b, c, d) {
                if (t === 0) {
                    return b;
                }
                if (t == d) {
                    return b + c;
                }
                if ((t /= d / 2) < 1) {
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                }
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOutCirc: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOutCirc: function (t, b, c, d) {
                if ((t /= d / 2) < 1) {
                    return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                }
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            /**
             *
             * @param {Integer} t  current time（当前计算次数）
             * @param {Number} b  beginning value（初始值）
             * @param {Number} c  change in value（变化量）
             * @param {Integer} d  duration（总共计算次数）
             */
            easeInElastic: function (t, b, c, d, a, p) {
                var s;
                if (t === 0) {
                    return b;
                }
                if ((t /= d) == 1) {
                    return b + c;
                }
                if (!p) {
                    p = d * 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) *
                        Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOutElastic: function (t, b, c, d, a, p) {
                var s;
                if (t === 0) {
                    return b;
                }
                if ((t /= d) == 1) {
                    return b + c;
                }
                if (!p) {
                    p = d * 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return a * Math.pow(2, -10 * t) *
                    Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            },
            easeInOutElastic: function (t, b, c, d, a, p) {
                var s;
                if (t === 0) {
                    return b;
                }
                if ((t /= d / 2) == 2) {
                    return b + c;
                }
                if (!p) {
                    p = d * 0.45;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                if (t < 1) {
                    return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                        Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                }
                return a * Math.pow(2, -10 * (t -= 1)) *
                    Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
            },
            easeInBack: function (t, b, c, d, s) {
                if (s == null) {
                    s = 1.70158;
                }
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOutBack: function (t, b, c, d, s) {
                if (s == null) {
                    s = 1.70158;
                }
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOutBack: function (t, b, c, d, s) {
                if (s == null) {
                    s = 1.70158;
                }
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t +
                    s) + 2) + b;
            },
            easeInBounce: function (t, b, c, d) {
                var that = this;
                return c - that.easeOutBounce(d - t, 0, c, d) + b;
            },
            easeOutBounce: function (t, b, c, d) {
                if ((t /= d) < 0.36364) {
                    return c * (7.5625 * t * t) + b;
                }
                if (t < 0.72727) {
                    return c * (7.5625 * (t -= 0.54545) * t + 0.75) + b;
                }
                if (t < 0.90909) {
                    return c * (7.5625 * (t -= 0.81818) * t + 0.9375) + b;
                }
                return c * (7.5625 * (t -= 0.95455) * t + 0.984375) + b;
            },
            easeInOutBounce: function (t, b, c, d) {
                var that = this;
                if (t < d / 2) {
                    return that.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
                }
                return that.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 +
                    c * 0.5 + b;
            }
        };

    return {
        /**
         *
         * @param {Object} type
         * @return {Boolean} 是否有该种算法
         */
        has: function (type) {
            if (type && TYPE.isStr(type) && alg[type] &&
                    alg.hasOwnProperty(type)) {
                return true;
            }
            return false;
        },
        /**
         * 新增算法
         * @param {String} type
         * @param {Function} fn
         */
        add: function (type, fn) {
            if (type && fn && TYPE.isStr(type) && TYPE.isFn(fn)) {
                alg[type] = alg[type] || fn;
            }
        },
        /**
         * 使用算法进行计算
         * @param {String} type  算法类型
         * @param {Number} start  初始值
         * @param {Number} end 目标值
         * @param {Integer} currentTime 当前计算次数，为0至(totalTime -1)之间
         * @param {Integer} totalTime 总共计算次数
         * @param {Number} a    【可选】???
         * @param {Number} p    【可选】???
         * @return {Number} 返回该次计算值
         */
        compute: function (type, start, end, currentTime, totalTime, a, p) {
            var that = this;
            if (that.has(type)) {
                return alg[type](currentTime, start, end - start,
                    totalTime, a, p);
            }
        },
        /**
         * 一次性计算出所有的值
         * @param {String} type  算法类型
         * @param {Number} start  初始值
         * @param {Number} end 目标值
         * @param {Integer} totalTime 总共计算次数
         * @param {Number} a    【可选】???
         * @param {Number} p    【可选】???
         * @return {Array}  存储所有计算值的数组
         */
        computeAll: function (type, start, end, totalTime, a, p) {
            var ret,
                i,
                change,
                fn,
                that = this;
            if (that.has(type)) {
                ret = [];
                fn = alg[type];
                change = end - start;
                for (i = 0; i < totalTime; i++) {
                    ret.push(fn(i, start, change, totalTime, a, p));
                }
                return ret;
            }
        }
    };


});
