/**
 *  特定区域的随机整数
 * @author FuDesign2008@163.com
 * @date   2011-8-31
 * @time   下午02:08:28
 */


define(function () {

    /**
     *
     * @param {Number} from
     * @param {Number} to
     * @return {Integer}
     */
    return function (from, to) {
        //有bug
        //from = Math.min(from, to);
        //to = Math.max(from, to);
        var delta = Math.abs(to - from);
        from = Math.min(from, to);
        return Math.floor((delta + 1) * Math.random() + from);
    };
});
