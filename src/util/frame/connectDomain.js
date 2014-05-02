/**
 *  1) 当页面包含来自其他子域的框架或内嵌框架时, 由于跨域安全限制，来自不同子域的页面无法
 *  通过javascript通信。而通过将【每个】页面的domainConnect设置为相同的值，这些页面
 *  就可以互相访问对方的【javascript对象】
 *  2) 如果域名一开始是松散的(loose)， 那么不能将它设置为紧绷的(tight)，比如将sub.example.com的
 *  document.domain设置为example.com后，就不能再将起设置为sub.example.com
 * @author FuDesign2008@163.com
 * @date   2011-9-17
 * @time   下午03:41:20
 */


define(function (require) {
    var console = require('../../core/debug/console');
    /**
     *
     * @param {String} domain
     * @return {Boolean} 是否成功将document.domain设置为domain
     */
    return function (domain) {
        if (!domain) {
            return;
        }
        domain = String(domain);
        if (document.domain === domain) {
            return true;
        }
        try {
            document.domain = domain;
        } catch (ex) {
            console.error('[util.frame.domainConnect]: set domain as "' +
                domain + '" error!');
        }
        return document.domain === domain;
    };
});
