/**
 * 并行执行任务
 * 1) 不支持 conf.configs的监听函数的this关键字
 * 2) conf.configs.onResolve 回调函数要实现，如果不实现，没有异步效果
 * @author FuDesign2008@163.com
 * @date   2011-10-28
 * @time   上午11:20:56
 */


define(function (require, exports) {
    var TYPE = require('../obj/type'),
        PARAM = require('../obj/param');

    /**
     * @param {Object} conf
     * @param {Boolean} conf.autoPlay  是否自动开发运行任务，默认为true
     * @param {Function} conf.main  【必须】运行并行任务的函数
     * @param {Array} conf.configs  【必须】conf.main函数需要运行的配置数组
     * @param {String} conf.resolve  【可选】默认为 'onResolve',
     *              conf.configs数组元素中，可以侦听单个任务完成
     *              (不论失败成功与否)的key
     *              当需要实现异步效果时，请务必配置此项，
     *              如果不需要异步效果，请配置为false
     * @param {Function} conf.onProgress  每执行完成一项任务的回调
     * @param {Function} conf.onComplete  所有任务运行完成的回调
     * @return {Object}
     *              obj.total {Function}
     *              obj.finished {Function}
     *              obj.play {Function}
     */
    return function (conf) {
        conf = PARAM({
            autoPlay: true,
            main: null,
            configs: null,
            resolve: 'onResolve',
            onComplete: null
        }, conf);
        //
        if (!TYPE.isFn(conf.main) || !TYPE.isArr(conf.configs) ||
                !conf.configs.length) {
            return;
        }
        var LEN = conf.configs.length,
            counter = 0,
            main = conf.main,
            arrConfigs = conf.configs,
            resolve = conf.resolve,
            onProgress = conf.onProgress,
            isFnOnProgress = TYPE.isFn(onProgress),
            onComplete = conf.onComplete,
            isFnOnComplete = TYPE.isFn(onComplete),
            hasPlayed = false,
            retObj,
            run = function (theConf) {
                var oldResolve;
                if (resolve) {
                    oldResolve = theConf[resolve];
                    theConf[resolve] = function () {
                        if (TYPE.isFn(oldResolve)) {
                            oldResolve.apply(null, arguments);
                        }
                        theConf[resolve] = oldResolve;
                        oldResolve = null;
                        counter += 1;
                        if (isFnOnProgress) {
                            onProgress(theConf);
                        }
                        if (counter >= LEN && isFnOnComplete) {
                            onComplete();
                        }
                    };
                    //
                    main(theConf);
                } else {
                    main(theConf);
                    counter += 1;
                    if (isFnOnProgress) {
                        onProgress(theConf);
                    }
                    if (counter >= LEN && isFnOnComplete) {
                        onComplete();
                    }
                }
            };
        retObj = {
            /**
             * @return {Integer} 返回要完成的任务单元总数
             */
            total: function () {
                return LEN;
            },
            /**
             * @return {Integer} 返回已经完成的任务单元数
             */
            finished: function () {
                return counter;
            },
            /**
             * 执行任务
             */
            play: function () {
                if (hasPlayed === false) {
                    hasPlayed = true;
                    while (arrConfigs && arrConfigs.length) {
                        run(arrConfigs.shift());
                    }
                }
            }
        };
        //
        if (conf.autoPlay) {
            retObj.play();
        }
        return retObj;
    };
});
