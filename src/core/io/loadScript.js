/**
 * 远程加载script文件，支持跨域
 * 1） scriptLoader无法区分是否加载成功，只可以判断加载过程是否完成
 * @author FuDesign2008@163.com
 * @date   2011-8-16
 * @time   上午08:04:14
 */



define(function (require) {
    var END_WITH = require('../str/endWith'),
        TYPE = require('../obj/type'),
        TO_QUERY = require('../obj/toQuery'),
        UNIQUE = require('../math/unique'),
        PARAM = require('../obj/param'),
        UA = require('../bom/ua'),
        DOC = document,
        HEAD = DOC.head || DOC.getElementsByTagName('head')[0] ||
            DOC.documentElement,
        /**
         *
         * @param {Object} conf
         * @param {HTMLElement} script
         */
        scriptHandler = function (conf, script) {
            if (TYPE.isFn(conf.onComplete)) {
                conf.onComplete(conf.url);
            }
            script.onload = null;
            script.onreadystatechange = null;
            script.onabort = null;
            script.onerror = null;
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            script = null;
        };

    /**
     *
     * @param {Object|Array} conf
     * @param {String} conf.url     脚本地址
     * @param {Object} conf.data     发到后台的数据,key/value类型
     * @param {Boolean} conf.encode  是否对conf.data的key/value使用
     *                      encodeURIComponent进行编码，默认为true
     * @param {String} conf.type    脚本类型，默认为text/javascript
     * @param {String} conf.charset   脚本编码，默认为utf-8
     * @param {Boolean} conf.rand     是否加上随机数，以阻止缓存，默认为false
     * @param {Function} conf.onComplete 加载完成的回调函数【无法区分是否加载成功】
     * @param {Function} conf.onResolve     提供给core.async.parallel 和
     *                      core.async.queue
     *
     */

    return function (conf) {
        conf = PARAM({
            url: null,
            data: null,
            encode: true,
            type: 'text/javascript',
            charset: 'utf-8',
            rand: false,
            onComplete: null,
            onResolve: null
        }, conf);
        var onResolve = conf.onResolve,
            runOnResovle = function () {
                if (TYPE.isFn(onResolve)) {
                    onResolve();
                }
            },
            data,
            queryStr,
            temp,
            url = conf.url,
            script;
        //
        if (!url || !TYPE.isStr(url)) {
            runOnResovle();
            return;
        }
        //
        if (conf.data || conf.rand === true) {
            data = conf.data || {};
            if (conf.rand === true) {
                data.rand = UNIQUE();
            }
            queryStr = TO_QUERY(data, conf.encode);
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
        }
        //
        script = DOC.createElement('script');
        if (UA.IE) {
            script.onreadystatechange = function () {
                var state = script.readyState.toLowerCase();
                if (state === 'loaded' || state === 'complete') {
                    scriptHandler(conf, script);
                    runOnResovle();
                }
            };
        } else {
            script.onload = function () {
                scriptHandler(conf, script);
                runOnResovle();
            };
            //FF,Chrome，如果加载过程中出现错误，继续加载其余的script文件
            //TODO opera不支持onerror事件,在文件加载过程中出错时，不可继续加载
            //ie6-8 不支持onerror事件，在文件加载过程中出错时，可继续加载
            script.onerror = function () {
                scriptHandler(conf, script);
                runOnResovle();
            };
        }
        script.onabort = function () {
            scriptHandler(conf, script);
            runOnResovle();
        };
        script.type = conf.type;
        script.charset = conf.charset;
        script.src = url;
        //jQuery的注释：
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        HEAD.insertBefore(script, HEAD.firstChild);
    };
});
