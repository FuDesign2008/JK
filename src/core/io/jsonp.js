/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-31
 * @time   下午02:10:49
 */


define(function (require) {
    var UNIQUE = require('../math/unique'),
        TYPE = require('../obj/type'),
        PARAM = require('../obj/param'),
        DESTROY = require('../obj/destroy'),
        LOAD_SCRIPT = require('./loadScript'),
        /**
         *
         * @param {String} fnName
         */
        clearJsonp = function (fnName) {
            window[fnName] = null;
            try {
                delete window[fnName];
            } catch (ex) {
                // do nothing
            }
        };

    /**
     *
     * @param {Object} conf
     * @param {String} conf.url    脚本地址
     * @param {Object} conf.data    发到后台的数据,key/value类型
     * @param {Boolean} conf.encode  是否对conf.data的key/value使用
     *                      encodeURIComponent进行编码，默认为true
     * @param {String} conf.type   脚本类型，默认为text/javascript
     * @param {String} conf.charset   脚本编码，默认为utf-8
     * @param {Boolean} conf.rand   是否加上随机数，以阻止缓存，默认为false
     * @param {Integer} conf.time   时间限制，默认为 10000 ms
     * @param {Function} conf.onTimeout   【可选】超时回调
     * @param {Function} conf.onComplete  【必须】，加载完成的回调函数
     *                  【无法区分是否加载成功】
     *  // ...&callback=dot_jsonp_1234
     * @param {String} conf.jsonp  【可选】  默认为'callback'
     * @param {String} conf.jsonpCallback  【可选】 默认由程序设定，
     *                  不推荐手动配置
     *  //
     * @param {Function} conf.onResolve  提供给core.async.parallel 和
     *                  core.async.queue
     *
     *  @return {Object} obj.abort 取消正在进行的jsonp
     */

    return function (conf) {
        conf = PARAM({
            url: null,
            data: null,
            encode: true,
            type: 'text/javascript',
            charset: 'utf-8',
            rand: false,
            time: 10000,
            onTimeout: null,
            onComplete: null,
            jsonp: 'callback',
            jsonpCallback: null,
            onResolve: null
        }, conf);
        var onResolve = conf.onResolve,
            runOnResovle = function () {
                if (TYPE.isFn(onResolve)) {
                    onResolve();
                }
            },
            fnName = conf.jsonpCallback || 'dot_jsonp_' + UNIQUE(),
            onComplete = conf.onComplete,
            time = conf.time,
            onTimeout = conf.onTimeout,
            timeoutID;
        //
        if (!conf.url || !TYPE.isStr(conf.url) ||
                !TYPE.isFn(conf.onComplete)) {
            runOnResovle();
            return;
        }

        conf.data = conf.data || {};
        conf.data[conf.jsonp] = fnName;
        //
        delete conf.onComplete;
        delete conf.time;
        delete conf.onTimeout;
        delete conf.jsonpCallback;
        delete conf.jsonp;
        //
        window[fnName] = function () {
            window.clearTimeout(timeoutID);
            onComplete.apply(null, arguments);
            clearJsonp(fnName);
            runOnResovle();
        };
        LOAD_SCRIPT(conf);
        //
        if (time >= 0) {
            timeoutID = window.setTimeout(function () {
                // the jsonp will be loaded later and window[fnName] may be
                // execueted
                window[fnName] = function () {
                    clearJsonp(fnName);
                };
                //
                if (TYPE.isFn(onTimeout)) {
                    onTimeout(conf.url);
                }
                runOnResovle();
            }, time);
        }
        return {
            abort: function () {
                // the jsonp will be loaded later and window[fnName] may be
                // execueted
                window[fnName] = function () {
                    clearJsonp(fnName);
                };
                if (time > 0) {
                    window.clearTimeout(timeoutID);
                }
                runOnResovle();
                DESTROY({
                    target: this
                });
            }
        };

    };
});

