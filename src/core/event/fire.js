/**
 * 主动触发元素的非自定义事件
 * 1). 虽然FF等支持自定义事件，但IE只支持主动触发非自定义事件，故降级至IE主动触发所支持的事件
 * 2). 支持的事件见 http://msdn.microsoft.com/en-us/library/ms533051(v=VS.85).aspx
 * 3). 若要主动触发自定义事件，请用 core.event.custom
 * @author FuDesign2008@163.com
 * @date   2011-9-9
 * @time   上午10:39:43
 */



define(function (require) {
    /**
     * @param {HTMLElement} el
     * @param {String} type
     */
    return function (el, type) {
        if (el && el.fireEvent) {
            el.fireEvent('on' + type);
        } else if (el && el.dispatchEvent && document.createEvent) {
            var e = document.createEvent('HTMLEvents');
            e.initEvent(type, true, true);
            el.dispatchEvent(e);
        }
    };
});
