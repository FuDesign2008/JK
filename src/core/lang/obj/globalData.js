/**
 *  提供统一的类似全局的数据缓存，但避免了增加全局变量
 * @author FuDesign2008@163.com
 * @date   2011-10-28
 * @time   下午05:21:30
 */


define(function (require) {
    var DATA_CACHE = require('./dataCache'),
        globalData = DATA_CACHE();

    return globalData;
});
