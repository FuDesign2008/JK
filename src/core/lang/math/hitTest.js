


/**
 * 检测两个目标是否重叠
 * 注意：1. rect 和 point 必须在同一坐标系中
 *       2. 仅适用在 长方形 不斜放的情况下
 * @author FuDesign2008@163.com
 * @date   2011-12-13
 * @time   上午11:15:27
 */
define(function () {
    /**
     *
     * @param {Object} rect 长方形， rect.x0, rect.y0 表示左上角的顶点，
     *                               rect.x1, rect.y1 表示右下角的顶点
     * @param {Object} point   为点时， point.x, point.y 表示点的坐标
     *                         为长方形时，
     *                          point.x0, point.y0 表示左上角的顶点,
     *                          point.x1, point.y1 表示右下角的顶点
     *
     * @return {Boolean}  目标重叠返回true, 否则返回false
     */
    return function (rect, point) {
        var x0 = rect.x0,
            y0 = rect.y0,
            x1 = rect.x1,
            y1 = rect.y1,
            x,
            y;
        if (point.x != null) {//为点
            x = point.x;
            y = point.y;
            return (x >= x0 && x <= x1 && y >= y0 && y <= y1);
        }
        if (point.x0 != null) {//为长方形
            //投影到x，y轴去计算
            return ((point.x0 <= x0 && x0 <= point.x1) ||
                (x0 <= point.x0 && point.x0 <= x1)) &&
                ((point.y0 <= y0 && y0 <= point.y1) ||
                (y0 <= point.y0 && point.y0 <= y1));
        }
    };
});
