/**
 * 在IE下，无论是网页url, get请求，抑或ajax-get请求的url都会受到长度限制
 * http://blog.csdn.net/fudesign2008/article/details/6965199
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-13
 * @time   上午09:46:11
 */


define(function () {
    var MAX = 2083;

    /**
     * @param {String}  url  有效的绝对路径
     * @return {Boolean}  是否通过了最大长度限制的验证，如果没有超出，返回true, 否则false
     */
    return function (url) {
        url = String(url);
        return url.length <= MAX;
    };
});
