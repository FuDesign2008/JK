/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-3
 * @time   下午03:11:29
 */


define(function (require) {
    var TYPE  = require('../../core/obj/type'),
        PARAM  = require('../../core/obj/param'),
        FOR_EACH  = require('../../core/arr/forEach'),
        LOAD_SCRIPT  = require('../../core/io/loadScript'),
        QUEUE  = require('../../core/async/queue'),
        PARALLEL  = require('../../core/async/parallel'),
        LIB_DATA  = require('./libData');


    /**
     *
     * @param {Object} conf
     * @param {String|Array} conf.url 【必须】脚本地址或已经注册在libData的库名
     * @param {String} conf.type【可选】脚本类型，默认为text/javascript
     * @param {String} conf.charset【可选】脚本编码，默认为utf-8
     * @param {Boolean} conf.queue【可选】是否按顺序加载，默认为true,
     *    设置为false时，可以加快整个的下载速度
     * @param {Function} conf.onComplete {Function}【可选】加载完成的回调函数
     *   但无法区分是否加载成功, 因为加载的库可能报错
     *
     */
    return function (conf) {
        conf = PARAM({
            url: null,
            type: 'text/javascript',
            charset: 'utf-8',
            queue: true,
            onComplete: null
        }, conf);
        //
        if (!conf || !conf.url) {
            return;
        }
        var urls = TYPE.isArr(conf.url) ? conf.url : [conf.url],
            arrConf = [],
            runConf = {
                main: LOAD_SCRIPT,
                configs: arrConf,
                onComplete: conf.onComplete
            };
        FOR_EACH(urls, function (val) {
            arrConf.push({
                url: LIB_DATA.get(val) || val,
                type: conf.type,
                charset: conf.charset
            });
        });

        if (conf.queue) {
            QUEUE(runConf);
        } else {
            PARALLEL(runConf);
        }
    };

});
