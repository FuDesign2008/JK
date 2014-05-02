/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-26
 * @time   下午04:40:06
 */


define(function (require, exports) {
    var PARAM = require('../obj/param'),
        DOC = document,
        HEAD =  DOC.head || DOC.getElementsByTagName('head')[0] ||
            DOC.documentElement;
    /**
     *
     * @param {Object} conf
     * @param {String} conf.script  代码字符串
     * @param {String} conf.type  默认为text/javascript
     * @param {String} conf.charset  默认为utf-8
     */

    return function (conf) {
        conf = PARAM({
            script: '',
            type: 'text/javascript',
            charset: 'utf-8'
        }, conf);
        if (!conf.script) {
            return;
        }
        var script = DOC.createElement('script');
        script.type = conf.type;
        script.charset = conf.charset;
        try {// for not IE
            script.innerHTML = conf.script;
        } catch (ex) {// for IE
            script.text = conf.script;
        }
        //jQuery的注释：
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        HEAD.insertBefore(script, HEAD.firstChild);
        window.setTimeout(function () {
            HEAD.removeChild(script);
            script = null;
        }, 50);
    };
});
