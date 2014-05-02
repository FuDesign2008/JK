/**
 * 分时执行
 * @see http://www.nczonline.net/blog/2009/08/11
 *   /timed-array-processing-in-javascript/
 * @author FuDesign2008@163.com
 * @date   2011-12-2
 * @time   下午04:35:11
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        PARAM = require('../obj/param');
    /**
     * @param {conf}
     * @param {Array} conf.task  数组元素是Function
     * @param {Object} conf.context   数组元素function中的this关键字的指向的
     *                  对象,默认为null
     * @param {Array} conf.args   数组元素function中的参数
     * @param {Integer} conf.time  时间片是多少毫秒，单位ms, 默认 100
     * @param {Integer} conf.delay  任务直接的时间间隔，单位ms, 默认为 50
     * @param {Function} conf.onComplete  所有任务运行完毕的回调
     */
    return function (conf) {
        if (!conf || !TYPE.isArr(conf.task) || !conf.task.length) {
            return;
        }
        conf = PARAM({
            task: null,
            context: null,
            args: null,
            time: 100,
            delay: 50,
            onComplete: null
        }, conf);
        //
        var task = conf.task,
            context =  conf.context || null,
            args = TYPE.isArr(conf.args) ? conf.args : [],
            time = conf.time,
            delay = conf.delay,
            onComplete = conf.onComplete,
            isFnOnComplete = TYPE.isFn(onComplete),
            runIt = function () {
                var fnSelf = runIt,
                    startTime = (new Date()).getTime(),
                    item;
                do {
                    item = task.shift();
                    if (TYPE.isFn(item)) {
                        item.apply(context, args);
                    }
                } while (task.length &&
                        ((new Date()).getTime() - startTime < time));
                //
                if (task.length) {
                    window.setTimeout(fnSelf, delay);
                } else if (isFnOnComplete) {
                    onComplete();
                }
            };
        //start to run task
        runIt();
    };
});
