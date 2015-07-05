/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-2
 * @time   下午02:10:27
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        PARAM = require('../obj/param'),
        DESTROY = require('../obj/destroy'),
        ALG = require('./alg'),
        BEFORE_START = 1,
        RUNNING = 2,
        PAUSED = 4;

    /**
     * @param conf {Object}
     * @param {String} conf.type    【可选】算法类型，默认为 'linear'
     *              依赖core.ani.alg
     * @param {Number|Array} conf.start   【必须】初始值
     * @param {Number|Array} conf.end     【必须】最后值
     * @param {Integer} conf.fps     【可选】帧频，默认为30 fps
     * @param {Number} conf.time       【可选】持续时间,默认为 1.5 s
     * @param {Boolean} conf.autoPlay   【可选】 是否自动播放动画，默认为true
     * @param {Function} conf.onTween   【必须】 正在运行动画的回调
     * @param {Function} conf.onComplete   【可选】动画结束的回调
     *              当执行stop()方法时，也会执行该回调
     */
    return function (conf) {
        conf = PARAM({
            type: 'linear',
            start: null,
            end: null,
            fps: 30,
            time: 1.5,
            autoPlay: true,
            onTween: null,
            onComplete: null
        }, conf);
        if (!ALG.has(conf.type) || !TYPE.isFn(conf.onTween)) {
            return;
        }
        var onTween = conf.onTween,
            isFnOnComplete = TYPE.isFn(conf.onComplete),
            type = conf.type,
            start = conf.start,
            end = conf.end,
            isArrStart = TYPE.isArr(start),
            i,
            len = isArrStart ? start.length : null,
            total = Math.floor(conf.time * conf.fps),
            totalSubOne = total - 1,
            counter = 0,
            interval = Math.floor((conf.time / total) * 1000),
            timeoutID,
            status = BEFORE_START,
            retObj,
            runFn = function () {
                var computed,
                    fnSelf = runFn;
                if (status === PAUSED) {
                    return;
                }
                if (counter < total) {
                    if (counter === totalSubOne) {
                        computed = end;
                    } else {
                        if (isArrStart) {
                            computed = [];
                            /*jshint maxdepth: 4*/
                            for (i = 0; i < len; i++) {
                                computed.push(ALG.compute(type, start[i],
                                        end[i], counter, total));
                            }
                        } else {
                            computed = ALG.compute(type, start, end, counter,
                                total);
                        }
                    }
                    onTween(computed);
                    counter += 1;
                    timeoutID = window.setTimeout(fnSelf, interval);
                } else {
                    retObj.stop();
                }
            };

        retObj = {
            /**
             * 开始/继续 执行动画
             */
            play: function () {
                if (status !== RUNNING) {
                    status = RUNNING;
                    runFn();
                }
            },
            /**
             * 暂停 执行动画
             */
            pause: function () {
                status = PAUSED;
            },
            /**
             * 【永久性】停止 执行动画，同时销毁tween对象，不可继续执行
             */
            stop: function () {
                var that = this;
                window.clearTimeout(timeoutID);
                if (isFnOnComplete) {
                    conf.onComplete();
                }
                DESTROY({
                    target: that
                });
                conf = runFn = that = null;
            },
            /**
             * 不再执行动画效果，迅速完成动画目标值,同时销毁tween对象
             */
            finish: function () {
                var that = this;
                window.clearTimeout(timeoutID);
                onTween(end);
                that.stop();
            }
        };

        if (conf.autoPlay !== false) {
            retObj.play();
        }
        return retObj;
    };
});
