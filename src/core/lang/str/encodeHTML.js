/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-23
 * @time   下午09:33:23
 */


define(function (require) {
    /**
     * 编码
     * @param {String} str
     * @return {String}
     * @see http://www.w3schools.com/tags/ref_entities.asp
     */
    return function (str) {
        //& -> &amp;
        str = String(str).replace(/&/g, '&amp;')
            //双引号
            .replace(/"/g, '&quot;')
            //小于号
            .replace(/</g, '&lt;')
            //大于号
            .replace(/>/g, '&gt;')
            //单引号
            .replace(/'/g, '&apos;')
            //英文空格
            .replace(/ /g, '&nbsp;');
        //
        return str;
    };

});
