/**
 *使得div类容器的innerHTML在TextareaElement/TextInputElement的显示时一样
 * @author FuDesign2008@163.com
 * @date   2011-8-23
 * @time   下午09:33:23
 */


define(function (require) {
    var UA = require('../../core/bom/ua');
    return function (str) {
            //换行
        str = String(str).replace(/<br\/?>/g, UA.IE ? '\r\n' : '\n')
                //双引号
                .replace(/&quot;/g, '"')
                //小于号
                .replace(/&lt;/g, '<')
                //大于号
                .replace(/&gt;/g, '>')
                //单引号
                //.replace(/&#39/g, '\'')
                .replace(/&apos;/g, '\'')
                //空格
                .replace(/&nbsp;/g, '\u0020')
                //空格
                .replace(/&#32/g, '\u0020')
                //&
                .replace(/&amp;/g, '\&');
        return str;

    };
});
