/**
 * 串行执行任务队列
 * 1) 不支持 conf.configs的监听函数的this关键字
 * 2)  conf.configs.onResolve 回调函数要实现，如果不实现，没有异步效果
 * @author FuDesign2008@163.com
 * @date   2011-10-26
 * @time   下午05:30:22
 */



define(function (require) {
    var TYPE = require('../obj/type'),
        PARAM = require('../obj/param'),
        DESTROY = require('../obj/destroy'),
        FOR_EACH = require('../arr/forEach'),
        //状态
        BEFORE_START = 1,
        RUNNING = 2,
        PAUSED = 4;

    /**
     * @param {Object} conf
     * @param {Integer} conf.time  【可选】任务间隔时间，
     *                  如果为负数，直接执行，不进行setTimeout，默认为50ms
     * @param {Boolean} conf.autoPlay  是否自动开发运行任务，默认为true
     * @param {Function} conf.main  【必须】运行队列任务的函数
     * @param {String} conf.abort  【可选】取消正在运行的任务的方法，默认为false
     *                      也是conf.main返回对象的方法名,
     *                      如果不配置，调用retObj.cancel方法时
     *                      可能无法取消正在运行的任务
     * @param {Array} conf.configs 【必须】conf.main函数需要运行的配置数组
     * @param {String} conf.resolve  【可选】默认为 'onResolve',
     *                 也是conf.configs数组元素中
     *                 可以侦听单个任务完成(不论失败成功与否)的key
     *                 当需要实现异步效果时，请务必配置此项，
     *                 如果不需要异步效果，请配置为false
     * @param {Function} conf.onProgress  每执行完成一项任务的回调
     * @param {Function} conf.onComplete  所有任务运行完成的回调
     * @return {Object}
     *              obj.total {Function}
     *              obj.finished {Function}
     *              obj.play {Function}
     *              obj.pause {Function}
     *              obj.cancel {Function}
     */
    return function (conf) {
        conf = PARAM({
            time: 50,
            autoPlay: true,
            main: null,
            abort: false,
            configs: null,
            resolve: 'onResolve',
            onProgress: null,
            onComplete: null
        }, conf);
        //
        if (!TYPE.isFn(conf.main) || !TYPE.isArr(conf.configs) ||
                !conf.configs.length) {
            return;
        }
        //
        var RESOLVE = conf.resolve,
            arrConfigs = conf.configs,
            TOTAL = arrConfigs.length,
            TIME = conf.time,
            isNegative = TIME < 0,
            MAIN = conf.main,
            ABORT = TYPE.isFn(conf.abort) ? conf.abort : null,
            timeoutID = null,
            finishedCounter = 0,
            retObj,
            status = BEFORE_START,
            isCanceled = false,
            onProgress = TYPE.isFn(conf.onProgress) ? conf.onProgress : null,
            onComplete = TYPE.isFn(conf.onComplete) ? conf.onComplete : null,
            runningHandle,
            run = function () {
                if (status === PAUSED || isCanceled) {
                    return;
                }
                var fnSelf = run,
                    theConf,
                    oldResolve;
                if (finishedCounter < TOTAL) {
                    theConf = arrConfigs.shift();
                    if (RESOLVE) {
                        oldResolve = TYPE.isFn(theConf[RESOLVE]) ?
                                theConf[RESOLVE] : null;
                        theConf[RESOLVE] = function () {
                            if (oldResolve) {
                                oldResolve.apply(null, arguments);
                            }
                            theConf[RESOLVE] = oldResolve;
                            oldResolve = null;
                            timeoutID = null;
                            finishedCounter += 1;
                            if (onProgress) {
                                onProgress(theConf);
                            }
                            //
                            if (isCanceled || finishedCounter >= TOTAL) {
                                if (onComplete) {
                                    onComplete();
                                }
                                if (retObj && retObj.cancel) {
                                    retObj.cancel();
                                }
                                return;
                            }
                            // to run next
                            if (isNegative) {
                                fnSelf();
                            } else {
                                timeoutID = window.setTimeout(fnSelf, TIME);
                            }
                        };
                        if (ABORT) {
                            runningHandle = MAIN(theConf);
                        } else {
                            MAIN(theConf);
                        }
                    } else {
                        if (runningHandle) {
                            runningHandle.push(MAIN(theConf));
                        } else {
                            MAIN(theConf);
                        }
                        finishedCounter += 1;
                        if (onProgress) {
                            onProgress(theConf);
                        }
                        if (isCanceled || finishedCounter >= TOTAL) {
                            if (onComplete) {
                                onComplete();
                            }
                            if (retObj && retObj.cancel) {
                                retObj.cancel();
                            }
                            return;
                        }
                        // to run next
                        if (isNegative) {
                            fnSelf();
                        } else {
                            timeoutID = window.setTimeout(fnSelf(), TIME);
                        }
                    }
                    //
                }
            };
        if (!RESOLVE && ABORT) {
            runningHandle = [];
        }
        //
        retObj = {
            /**
             * @return {Integer} 返回要完成的任务单元总数
             */
            total: function () {
                return TOTAL;
            },
            /**
             * @return {Integer} 返回已经完成的任务单元数
             */
            finished: function () {
                return finishedCounter;
            },
            /**
             * 执行任务
             */
            play: function () {
                if (status !== RUNNING) {
                    status = RUNNING;
                    run();
                }
            },
            /**
             * 停止继续执行任务
             */
            pause: function () {
                status = PAUSED;
            },
            /**
             * 取消继续执行任务，
             */
            cancel: function () {
                var that = this,
                    tempArr = [];
                if (ABORT) {
                    tempArr = RESOLVE ?
                            tempArr.push(runningHandle) : runningHandle;
                    FOR_EACH(tempArr, function (handle) {
                        if (handle && TYPE.isFn(handle[ABORT])) {
                            try {
                                handle[ABORT]();
                            } catch (ex) {
                                //do nothing
                            }
                        }
                    });
                }
                isCanceled = true;
                DESTROY({
                    target: that
                });
                conf = run = that = null;
            }

        };
        //start to run;
        if (conf.autoPlay !== false) {
            retObj.play();
        }
        return retObj;
    };
});

