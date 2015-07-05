/**
 * 分析url
 * url的一般格式为 protocol :// hostname[:port] /path/[;parameters][?query][#hash]
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-12
 * @time   下午06:34:22
 */


define(function (require) {

    var START_WITH = require('../../core/str/startsWith'),
        END_WITH = require('../../core/str/endsWith'),
        R_ABS = /^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
        ABS_NAMES = ['url', 'protocol', 'slash', 'host', 'port', 'path', 'search', 'hash'],
        R_REL = /^(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
        REL_NAMES = ['url', 'path', 'search', 'hash'],
        PARSE_URL = function (url, pattern, names) {
            var result = pattern.exec(url),
                ret,
                i;
            if (!result) {
                return null;
            }
            ret = {};
            i = result.length - 1;
            for (i; i >= 0; i--) {
                ret[names[i]] = result[i] || '';
            }
            return ret;
        };

    /**
     * @param {String} url or urlHash
     * @return {Object}
     */
    return function (url) {
        if (!url) {
            return null;
        }
        url = String(url);
        var ret = START_WITH(url, '/') ? PARSE_URL(url, R_REL, REL_NAMES) : PARSE_URL(url, R_ABS, ABS_NAMES);
        if (!ret || (ret.host && ret.host.indexOf('/') > -1)) {
            return null;
        }
        ret.host = ret.host || '';
        ret.protocol = ret.protocol || '';
        ret.slash = ret.slash || '';
        ret.port = ret.port || '';
        //
        ret.hostRoot = (ret.protocol ? (ret.protocol + ':') : '') +
            ret.slash + ret.host +
            (ret.port ? (':' + ret.port) : '') + (ret.host ? '/' : '');
        ret.pagePath = (END_WITH(ret.hostRoot, '/') ? ret.hostRoot : '/') +
            ret.path;
        ret.pageRoot = END_WITH(ret.pagePath, '/') ? ret.pagePath :
                ret.pagePath.substring(0, ret.pagePath.lastIndexOf('/') + 1);
        ret.searchPath = ret.pagePath + (ret.search ? '?' + ret.search : '');
        ret.hashPath = ret.searchPath + '#' + ret.hash;
        //
        return ret;
    };
});
