/**
 * 统一获取图片src的方式
 * 禁止使用img.getAttribute('src')和$(img).attr('src')的方式去获取图片src
 * see more : http://blog.csdn.net/fudesign2008/article/details/7620985
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-28
 * @time   下午03:26:52
 */


define(function () {
    /**
     * @param img {HTMLElement}
     **/
    return function (img) {
        if (img && img.src) {
            return img.src;
        }
    };
});
