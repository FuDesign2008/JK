/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-26
 * @time   上午10:06:46
 */


define(function (require) {
    var TYPE = require('../obj/type'),
        PARAM = require('../obj/param'),
        APPEND_SCRIPT = require('../dom/appendScript'),
        AJAX = require('./ajax');
    /**
     *
     * @param {Object} conf
     * @param {String} conf.url     请求地址
     * @param {Object} conf.data    发到后台的数据,key/value类型
     * @param {Boolean} conf.encode  是否对conf.data的key/value使用
     *                      encodeURIComponent进行编码，默认为true
     * @param {String} conf.method   请求类型（get/post）
     *                      默认为 'get'，不区分大小写
     * @param {String} conf.responseType  预期服务器返回的数据类型
     *                      默认为text, 可选值有text, json, xml, 不区分大小写
     * @param {Boolean} conf.async   是否异步，默认为 true
     * @param {Object} conf.header  要设置的请求头
     *
     * @param {Integer} conf.time    请求时间限制，默认为10000ms
     * @param {Function} conf.onTimeout   请求超时回调
     * @param {Function} conf.onSuccess   请求完成回调
     * @param {Function} conf.onFail      请求失败回调
     * @param {Function} conf.onStateChange   请求状态变化回调
     *
     * @param {String} conf.type  默认为text/javascript
     * @param {String} conf.charset  默认为utf-8
     * @param {Function} conf.onBeforeAppend  append script之前的回调
     *                  如果返回值为false, 将不append script
     * @param {Function} conf.onAfterAppend    append script 后的回调
     *
     * @param {Function} conf.onResolve 提供给core.async.parallel 和
     *                  core.async.queue
     *
     * @return {Object} XMLHttpRequest 对象
     *
     */
    return function (conf) {
        conf = PARAM({
            url: null,
            data: null,
            encode: true,
            method: 'get',// get, post
            responseType: 'text',//json,text, xml
            async: true,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //
            time: 10000,
            onTimeout: null,
            onSuccess: null,
            onFail: null,
            onStateChange: null,
            //
            type: 'text/javascript',
            charset: 'utf-8',
            onBeforeAppend: null,
            onAfterAppend: null,
            onResolve: null
        }, conf);
        //
        var type = conf.type,
            charset = conf.charset,
            onBeforeAppend = conf.onBeforeAppend,
            onAfterAppend = conf.onAfterAppend,
            onResolve = conf.onResolve,
            runOnResovle = function () {
                if (TYPE.isFn(onResolve)) {
                    onResolve();
                }
            },
            oldOnSuccess = conf.onSuccess,
            isFnOldOnSucess = TYPE.isFn(oldOnSuccess),
            isFnOnBeforeAppend = TYPE.isFn(onBeforeAppend),
            isFnOnAfterAppend = TYPE.isFn(onAfterAppend);
        //
        delete conf.type;
        delete conf.charset;
        delete conf.onBeforeAppend;
        delete conf.onAfterAppend;
        //
        //
        conf.onSuccess = function (data, xhr) {
            var temp = true;
            if (isFnOldOnSucess) {
                oldOnSuccess(data, xhr);
            }
            conf.onSuccess = oldOnSuccess;
            oldOnSuccess = null;
            if (!TYPE.isStr(data)) {
                runOnResovle();
                return;
            }
            if (isFnOnBeforeAppend) {
                temp = onBeforeAppend(data, xhr);
            }
            if (temp === false) {
                runOnResovle();
                return;
            }
            APPEND_SCRIPT({
                script: data,
                type: type,
                charset: charset
            });
            if (isFnOnAfterAppend) {
                onAfterAppend(data, xhr);
            }
            runOnResovle();
        };
        return AJAX(conf);
    };
});
