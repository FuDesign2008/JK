/**
 *  判断是否是window对象
 *  在IE下，window对象并不总是与自身相等(产生的bug很多，比如会导致window.event不会与自身相等)
 *   window is not always window in IE, see for more:
 *   http://www.davidflanagan.com/2007/03/more-on-ie-and-windowevent.html
 * @author FuDesign2008@163.com
 * @date   2011-9-22
 * @time   下午04:45:18
 */


define(function () {
    /**
     * @param {Object} obj
     * @return {Boolean}
     *
     */
    return function (obj) {
        //比较粗劣的方法
        if (obj && obj.setTimeout && obj.open) {
            return true;
        }
        return false;
    };
});
