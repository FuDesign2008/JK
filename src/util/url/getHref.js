/**
 * 统一获取连接<a/>获取href的方式
 * 禁止使用link.getAttribute('href')和$(link).attr('href')的方式去获取连接href
 * see more :
 *      http://blog.csdn.net/fudesign2008/article/details/7620985
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-12
 * @time   下午06:34:22
 */


define(function () {
    return function (link) {
        if (link && link.href) {
            return link.href;
        }
    };
});
