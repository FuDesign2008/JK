/**
 * 可跨域的数据提交，需要服务器端接口的支持
 *
 * @author FuDesign2008@163.com
 * @date   2011-12-19
 * @time   上午10:11:32
 */


define(function (require) {
    var PARAM = require('../obj/param'),
        TYPE = require('../obj/type'),
        TO_QUERY = require('../obj/toQuery'),
        END_WITH = require('../str/endWith'),
        UNIQUE = require('../math/unique'),
        console = require('../debug/console'),
        imgHolder = {};
    /**
     *
     * @param {Object} conf
     * @param {String} conf.url   请求地址
     * @param {Object} conf.data  要提交的数据
     * @param {Boolean} conf.encode  是否对conf.data的key/value使用
     *                  encodeURIComponent进行编码，默认为true
     * @param {Function} conf.onSuccess  请求成功的回调
     * @param {Function} conf.onFail  请求失败的回调
     * @param {Function} conf.onAbort  请求取消的回调
     *              //
     * @param {Function} conf.onResolve     提供给core.async.parallel 和
     *              core.async.queue
     * @return  {Null}
     */
    return function (conf) {
        //
        conf = PARAM({
            url: '',
            data: null,
            encode: true,
            onSuccess: null,
            onFail: null,
            onAbort: null,
            onResolve: null
        }, conf);
        var onResolve = conf.onResolve,
            runOnResovle = function () {
                if (TYPE.isFn(onResolve)) {
                    onResolve();
                }
            },
            temp,
            queryStr,
            url,
            data,
            uid,
            img;
        if (!conf || !conf.url) {
            console.error('[core/io/imgSubmit] need a url to submit: ' +
                    conf.url);
            runOnResovle();
            return;
        }
        //
        url = conf.url;
        data = conf.data || {};
        uid = 'core_io_img_submit_' + UNIQUE();
        //
        data._rand = uid;
        queryStr = TO_QUERY(conf.data, conf.encode);
        temp = url.indexOf('?');
        if (temp > -1) {
            if (temp === url.length - 1) {
                url += queryStr;
            } else {
                url += END_WITH(url, '&') ? queryStr : ('&' + queryStr);
            }
        } else {
            url += '?' + queryStr;
        }
        //
        img = new Image();
        imgHolder[uid] = img;
        //
        img.onload = function () {
            img = img.onload = img.onerror = img.onabort = null;
            delete imgHolder[uid];
            if (TYPE.isFn(conf.onSuccess)) {
                conf.onSuccess();
            }
            runOnResovle();
        };
        img.onerror = function () {
            img = img.onload = img.onerror = img.onabort = null;
            delete imgHolder[uid];
            if (TYPE.isFn(conf.onFail)) {
                conf.onFail();
            }
            runOnResovle();
        };
        img.onabort = function () {
            img = img.onload = img.onerror = img.onabort = null;
            delete imgHolder[uid];
            if (TYPE.isFn(conf.onAbort)) {
                conf.onAbort();
            }
            runOnResovle();
        };
        //
        img.src = url;
    };
});
