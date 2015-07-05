/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-8-12
 * @time   下午01:28:23
 */


define(function () {

    /**
     * @param {Array} arr 必须是数值数组，忽略null,undefined;
     */
    return function (arr) {
        if (!arr || !arr.length) {
            return;
        }
        var max = arr[0],
            index = [0],
            i,
            temp,
            l = arr.length;

        for (i = 1; i < l; i++) {
            temp = arr[i];
            if (temp != null) {
                if (max < temp) {
                    max = temp;
                    index = [i];
                } else if (max === temp) {
                    index.push(i);
                }
            }
        }
        return {
            max: max,
            index: index
        };
    };
});
