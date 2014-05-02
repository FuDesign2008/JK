/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-11
 * @time   下午03:39:40
 */


define(function (require) {
    var FOR_OWN = require('../obj/forOwn'),
        PARAM = require('../obj/param'),
        TYPE = require('../obj/type'),
        TO_QUERY = require('../obj/toQuery'),
        END_WITH = require('../str/endWith'),
        JSON = require('../../lib/alias/JSON'),
        XHR = require('./xhr'),
        console = require('../debug/console'),
        NOOP = function () {
            //do nothing
        };
    /**
     *
     * @param {Object} conf
     * @param {String} conf.url 请求地址
     * @param {Object} conf.data    发到后台的数据,key/value类型
     * @param {Boolean} conf.encode  是否对conf.data的key/value
     *                  使用encodeURIComponent进行编码
     *                  默认为true
     * @param {String} conf.method   请求类型（get/post）
     *                  默认为 'get'，不区分大小写
     * @param {String} conf.responseType  预期服务器返回的数据类型
     *                  默认为json, 可选值有text, json, xml, 不区分大小写
     * @param {Boolean} conf.async   是否异步，默认为 true
     * @param {Object} conf.header  要设置的请求头
     *
     * @param {Integer} conf.time    请求时间限制，默认为10000ms
     *                  当请求超时时，自动abort请求
     * @param {Function} conf.onTimeout   请求超时回调
     * @param {Function} conf.onSuccess   请求成功回调
     * @param {Function} conf.onFail      请求失败回调
     *
     * //为了提供更精细的控制
     * @param {Function} conf.onStateChange   请求状态变化回调
     * @param {Function} conf.onResolve  提供给core/async/parallel 和
     *                  core/async/queue
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
            responseType: 'json',//json,text, xml
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
            onResolve: null
        }, conf);
        //
        var runOnResovle = function () {
                if (TYPE.isFn(conf.onResolve)) {
                    conf.onResolve();
                }
            },
            xhr,
            isGet,
            temp,
            queryStr,
            isFnOnTimeout,
            isFnOnSuccess,
            isFnOnFail,
            isFnOnStateChange,
            timeoutID,
            responseData,
            handler;
        //
        if (!conf.url) {
            console.error('[core.io.ajax] conf.url=' + conf.url + ' is error!');
            runOnResovle();
            return;
        }
        xhr = XHR();
        //
        if (!xhr) {
            console.error('[core.io.ajax] XHR is null !');
            runOnResovle();
            return;
        }
        //不区分大小写
        conf.method = String(conf.method).toLowerCase();
        conf.responseType = String(conf.responseType).toLowerCase();
        //
        isGet = conf.method === 'get';
        if (conf.data && isGet) {
            queryStr = TO_QUERY(conf.data, conf.encode);
            conf.data = null;
            temp = conf.url.indexOf('?');
            if (temp > -1) {
                if (temp === conf.url.length - 1) {
                    conf.url += queryStr;
                } else {
                    conf.url += END_WITH(conf.url, '&') ?
                            queryStr : ('&' + queryStr);
                }
            } else {
                conf.url += '?' + queryStr;
            }
        } else {
            conf.data = TO_QUERY(conf.data, conf.encode);
        }
        //设置请求头
        FOR_OWN(conf.header, function (val, key) {
            try {
                xhr.setRequestHeader(key, val);
            } catch (ex) {
                //do nothing
            }
        });
        //
        isFnOnTimeout = TYPE.isFn(conf.onTimeout);
        isFnOnSuccess = TYPE.isFn(conf.onSuccess);
        isFnOnFail = TYPE.isFn(conf.onFail);
        isFnOnStateChange = TYPE.isFn(conf.onStateChange);
        //
        handler = function () {
            if (xhr.readyState === 4) {
                window.clearTimeout(timeoutID);
                /**
                 * IE9 下，当xhr abort 后，xhr.readyState的值仍然为4
                 * 但是尝试读取xhr.status属性时会报错
                 * 如果读取不了xhr.status属性，表示xhr请求出现了异常, 请求已结束
                 * @see http://groups.google.com/group/
                 * prototype-scriptaculous/browse_thread/thread/
                 * 661b0b93b9cfd10d/9092bcb471cb0d12?show_docid=9092bcb471cb0d12
                 *
                 */
                var status = false;
                try {
                    status = xhr.status;
                } catch (ex) {
                    //do nothing
                }
                if (status === false) {
                    runOnResovle();
                    return;
                }
                //
                if (conf.responseType === 'xml') {
                    responseData = xhr.responseXML;
                } else if (conf.responseType === 'text') {
                    responseData = xhr.responseText;
                } else {
                    try {
                        responseData = JSON.parse(xhr.responseText || '');
                    } catch (ex2) {
                        // do nothing, do not log
                        //$.log('[core.io.ajax] response data error!');
                    }
                }
                if ((status >= 200 && status <= 300) || status === 304) {
                    if (isFnOnSuccess) {
                        conf.onSuccess(responseData, xhr);
                    }
                    runOnResovle();
                } else {
                    if (isFnOnFail) {
                        conf.onFail(responseData, xhr);
                    }
                    runOnResovle();
                }
                handler = null;
                xhr.onreadystatechange = NOOP;
            }
            if (isFnOnStateChange) {
                conf.onStateChange(responseData, xhr);
            }
        };
        xhr.onreadystatechange = handler;
        xhr.open(conf.method, conf.url, conf.async);
        xhr.send(conf.data);
        //
        if (conf.time) {
            timeoutID = window.setTimeout(function () {
                //置空
                handler = null;
                xhr.onreadystatechange = NOOP;
                try {
                    xhr.abort();
                } catch (ex) {
                    // do nothing
                }
                if (isFnOnTimeout) {
                    conf.onTimeout(responseData, xhr);
                }
                runOnResovle();
            }, conf.time);
        }
        return xhr;
    };
});
