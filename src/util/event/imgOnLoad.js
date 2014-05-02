/**
 * 在IE6下，gif动画每切换一帧，就会触发包含该gif动画的<img/>标签的onload事件
 * @author FuDesign2008@163.com
 * @date   2011-8-26
 * @time   下午05:37:04
 */




define(function (require, exports) {
    var TYPE = require('../../core/obj/type'),
        IS_TAG = require('../../core/dom/isTag'),
        PARAM = require('../../core/obj/param'),
        BIND = require('../../core/event/bind'),
        UNBIND = require('../../core/event/unbind');
    //
    /**
     *
     * @param {Object} conf
     * @param {HTMLElement} conf.img   ImgNode
     * @param {Function} conf.onload   onload事件监听器
     * @param {Boolean} conf.checkGif  检查img.src的是否有.gif后缀
     *                 以阻止给img赋相同src时触发onload事件，默认为true
     */
    return function (conf) {
        if (!(conf && conf.img && IS_TAG(conf.img, 'img') &&
                conf.onload && TYPE.isFn(conf.onload))) {
            return null;
        }
        conf = PARAM({
            img: null,
            onload: null,
            checkGif: true
        }, conf);
        //
        var img = conf.img,
            checkGif = conf.checkGif,
            lastSrc = img.src || '',
            loadHandler = function () {
                var currentSrc = img.src;
                if (lastSrc === currentSrc &&
                        checkGif && /\.gif$/i.test(currentSrc)) {
                    return;
                }
                lastSrc = currentSrc;
                conf.onload.apply(img, arguments);
            };
        //to bind events
        BIND(img, loadHandler);
        //
        return {
            unbind: function () {
                UNBIND(img, 'onload', loadHandler);
                loadHandler = conf = null;
            }
        };
    };
});
