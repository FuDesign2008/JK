/**
 *  <a>标签中类似 href="javascript:;" href="javascript:void(0);" href="void(0)" 的属性
 *  在IE6下会出现不可预料的错误
 *  hrefFix 用于解决这个问题
 *  注意：对于php后台来说，<a>标签中都加上 onclick="return false;" 是必须的
 * @author FuDesign2008@163.com
 * @date   2011-8-21
 * @time   上午11:57:08
 */


define(function () {

    var HREF = 'href="javascript:void(0);" onclick="return false;" ',
        rClick = /onclick\=(['"])return\s+false;?\1/gi,
        rHref = /\shref\=(['"])(javascript:)?(void\(0\))?;?\1\s?/gi;

    /**
     *
     * @param {Object} conf
     * @param {} conf.html   HTML字符串
     * @param {} conf.replace 使用什么来替换类似这样的字符，
     *          默认为 'href="javascript:void(0);" onclick="return false;" '
     */
    return function (conf) {
        if (conf && conf.html) {
            //去除原有的onclick="return false;"
            conf.html = String(conf.html).replace(rClick, '');
            return conf.html.replace(rHref, conf.replace || HREF);
        }
    };
});
