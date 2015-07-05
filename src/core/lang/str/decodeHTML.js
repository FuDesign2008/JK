/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-23
 * @time   下午09:38:42
 */


define(function () {

    /**
     * 编码
     * @param {String} str
     * @return {String}
     * @example
     *          var str = textarea.value;
     *          div.innerHTML = decodeHTML(str);
     *
     * @see http://www.w3schools.com/tags/ref_entities.asp
     *
     */
    return function (str) {
        //双引号
        str = String(str).replace(/&quot;/g, '"')
            //小于号
            .replace(/&lt;/g, '<')
            //大于号
            .replace(/&gt;/g, '>')
            //单引号
            .replace(/&apos;/g, '\'')
            //空格
            .replace(/&nbsp;/g, ' ')
            //&
            .replace(/&amp;/g, '&');
        //
        return str;
    };
});
