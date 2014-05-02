/**
 * 按比例缩放
 * @author FuDesign2008@163.com
 * @date   2011-8-13
 * @time   下午07:05:09
 */


define(function () {
    /**
     *
     * @param {Object} opts,
     *              opts.width
     *              opts.height
     *              opts.maxHeight 可选
     *              opts.maxWidth 可选
     *              opts.minWidth 可选  必须小于maxWidth
     *              opts.minHeight 可选 必须小于maxHeight
     * @return {Object}
     *              {
     *                width:width,
     *                height:height,
     *                //是否经过缩放处理
     *                resize:resize,
     *                // 仅当 resize===true 时有用，
     *                //是否根据宽度来缩放的,否则是根据高度进行缩放处理的
     *                byWidth: byWidth
     *              }
     */
    return function (opts) {
        var width = opts.width,
            height = opts.height,
            maxWidth = opts.maxWidth,
            maxHeight = opts.maxHeight,
            minWidth = opts.minWidth,
            minHeight = opts.minHeight,
            reWidth = width,
            reHeight = height,
            resize = false,
            byWidth = false;
        /*jslint eqeq: true*/
        if (maxWidth != null && reWidth > maxWidth) {
            reHeight = (maxWidth * reHeight) / reWidth;
            reWidth = maxWidth;
            resize = true;
            byWidth = true;
        } else if (minWidth != null && reWidth < minWidth) {
            reHeight = (minWidth * reHeight) / reWidth;
            reWidth = minWidth;
            resize = true;
            byWidth = true;
        }
        //
        /*jslint eqeq: true*/
        if (maxHeight != null && reHeight > maxHeight) {
            reWidth = (maxHeight * reWidth) / reHeight;
            reHeight = maxHeight;
            resize = true;
            byWidth = false;
        } else if (minHeight != null && reHeight < minHeight) {
            reWidth = (minHeight * reWidth) / reHeight;
            reHeight = minHeight;
            resize = true;
            byWidth = false;
        }
        //
        return {
            width: reWidth,
            height: reHeight,
            resize: resize,
            byWidth: byWidth
        };
    };
});
