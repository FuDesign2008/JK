/**
 *
 * @author FuDesign2008@163.com
 * @date   2012-3-19
 * @time   下午12:10:22
 */


define(function (require) {
    var TYPE = require('../../core/obj/type'),
        PARAM = require('../../core/obj/param'),
        DESTROY = require('../../core/obj/destroy'),
        FOR_EACH = require('../../core/obj/forEach'),
        PRE_LOAD = require('../img/preLoad'),
        console = require('../../core/debug/console');

    /**
     * @param {Object} conf
     * @param {Integer} conf.time  加载超时时间,默认 30000 ms
     * @param {Integer} conf.pipeLine  并行加载管道数量，默认为1
     * @param {Integer} conf.cacheLimit  缓存数据的最大数量
     **/
    return function (conf) {
        conf = PARAM({
            time: 30000,
            pipeLine: 1,
            cacheLimit: 200
        }, conf);
        if (conf.time <= 0) {
            console.error('[util.img.preLoader] param is not valid!');
            return;
        }
        var TIME = conf.time,
            PIPE_LINE = conf.pipeLine,
            CACHE_LIMIT = conf.cacheLimit,
            dataCache = [],
            waiting = [],
            pipeCounter = 0,
            cacheCounter = 0,
            runTask = function () {},
            onLoad = function () {
                pipeCounter--;
                cacheCounter++;
                dataCache.push(this.url, true);
                while (dataCache.length > CACHE_LIMIT) {
                    dataCache.shift();
                }
                runTask();
            },
            onError = function () {
                pipeCounter--;
                runTask();
            };
        //redefined runTask
        runTask = function () {
            var url;
            while (pipeCounter < PIPE_LINE) {
                url = waiting.shift();
                if (TYPE.isStr(url)) {
                    pipeCounter++;
                    PRE_LOAD({
                        url: url,
                        time: TIME,
                        onLoad: onLoad,
                        onError: onError,
                        onAbort: onError,
                        onTimeout: onError
                    });
                }
            }
        };
        return {
            /**
             * @param urls {Array|String}
             **/
            load: function (urls) {
                var that = this,
                    fn = function (url) {
                        if (!that.isLoaded(url)) {
                            waiting.push(url);
                        }
                    };
                if (TYPE.isArr(urls)) {
                    FOR_EACH(urls, fn);
                } else {
                    fn(urls);
                }
                runTask();
            },
            /**
             * @param url {String}
             * @return {Boolean}
             **/
            isLoaded: function (url) {
                if (TYPE.isStr(url)) {
                    return dataCache[url] === true;
                }
                return false;
            },
            destroy: function () {
                dataCache.length = 0;
                dataCache = runTask = onError = onLoad = null;
                DESTROY({
                    target: this
                });
            }
        };
    };
});

