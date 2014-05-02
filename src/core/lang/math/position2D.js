/**
 * 两个目标的位置关系
 * 注意：1. 必须在同一坐标系中
 *       2. 仅适用在 长方形 不斜放的情况下
 * @author FuDesign2008@163.com
 * @date   2011-12-13
 * @time   上午11:15:27
 */


define(function (require, exports) {
    var HIT_TEST = require('./hitTest');

    /**
     *
     * @param {Object} rectA 长方形
     *                  rectA.x0, rectA.y0 表示左上角的顶点
     *                  rectA.x1, rectA.y1 表示右下角的顶点
     * @param {Object} rectB 长方形，
     *                  rectB.x0, rectB.y0 表示左上角的顶点
     *                  rectA.x1, rectB.y1 表示右下角的顶点
     * @return {Integer}
     *                  0 没有交集,
     *                  1 交集但不包含，
     *                  2 rectA包含rectB,
     *                  3 rectB包含rectA,
     *                  4 rectA 和 rectB 位置完全重合
     */
    return function (rectA, rectB) {
        var x0 = rectA.x0,
            y0 = rectA.y0,
            x1 = rectA.x1,
            y1 = rectA.y1,
            x0B = rectB.x0,
            y0B = rectB.y0,
            x1B = rectB.x1,
            y1B = rectB.y1;
        //
        if (x0 === x0B && y0 === y0B && x1 === x1B && y1 === y1B) {
            return 4;
        }
        if (x0 >= x0B && y0 >= y0B && x1B >= x1 && y1B >= y1) {
            return 3;
        }
        if (x0B >= x0 && y0B >= y0 && x1 >= x1B && y1 >= y1B) {
            return 2;
        }
        return HIT_TEST(rectA, rectB) ? 1 : 0;
    };
});

