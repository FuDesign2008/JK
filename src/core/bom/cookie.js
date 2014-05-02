/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-31
 * @time   下午05:02:26
 */


define(function (require, exports) {
    var PARAM = require('../obj/param'),
        ENCODE = require('../reg/encode'),
        TYPE = require('../obj/type');

    return {
        isEnabled: !!(window.navigator.cookieEnabled),
        get: function (name) {
            var that = this,
                cookie = document.cookie + ';',
                reg,
                match;
            if (that.isEnabled && name && TYPE.isStr(name)) {
                name = encodeURIComponent(name);
                reg = new RegExp(ENCODE(name) + '=([^;]*);');
                match = reg.exec(cookie);
                if (match) {
                    /*jslint eqeq:true*/
                    return decodeURIComponent(match[1] == null ? '' : match[1]);
                }
            }
            return '';
        },
        /**
         * see http://www.webdn.com/web_file/program/asp/N0610925/
         * @param {Object} conf
         * @param {String} conf.name   【必须】
         * @param {String} conf.value    {String}
         * @param {Integer} conf.expires多少【ms】以后失效
         * @param {String} conf.path   路径，默认为'/'
         * @param {String} conf.domain 域名
         * @param {Boolean} conf.secure 是否设置为安全加密状态,默认为false
         */
        set: function (conf) {
            var that = this,
                cookie,
                temp;
            if (that.isEnabled) {
                conf = PARAM({
                    name: null,
                    value: null,
                    expires: null,
                    path: '/',
                    domain: null,
                    secure: false
                }, conf);
                /*jslint eqeq:true*/
                if (conf.name != null) {
                    return;
                }
                cookie = [];
                /*jslint eqeq:true*/
                temp = conf.value == null ? '' : String(conf.value);
                temp = encodeURIComponent(temp);
                cookie.push(encodeURIComponent(conf.name) + '=' + temp);
                /*jslint eqeq:true*/
                if (conf.expires != null) {
                    temp = new Date();
                    temp = temp.setTime(temp.getTime() + conf.expires);
                    temp = temp.toGMTString();
                    cookie.push('expires=' + temp);
                }
                if (conf.path) {
                    cookie.push('path=' + conf.path);
                }
                if (conf.domain) {
                    cookie.push('domain=' + conf.domain);
                }
                if (conf.secure === true) {
                    cookie.push('secure');
                }
                document.cookie = cookie.join(';');
            }
        },
        remove: function (name) {
            var that = this;
            if (that.isEnabled) {
                if (name && TYPE.isStr(name)) {
                    that.set({
                        name: name,
                        expires: -100000
                    });
                }
            }
        }
    };
});
