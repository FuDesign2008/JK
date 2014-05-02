/**
 * HTMLElement的拖拽效果管理器
 * 1) dragM.unbind()只能移除使用dragM.bind()绑定的拖拽效果。
 * 2) 一个元素只可以通过dragM.bind()绑定一次拖拽效果，
 *    之前绑定的会自动解除，最后一次绑定的生效；
 *    如果需要多次绑定拖拽效果，请使用util.effect.drag，
 *    且移除非使用dragM.bind()绑定的拖拽效果时，只能手动移除绑定(dragObj.destroy())
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-23
 * @time   下午04:00:46
 */



define(function (require) {
    var TYPE = require('../../core/obj/type'),
        FOR_EACH = require('../../core/arr/forEach'),
        GUID = require('../../core/obj/guid'),
        ELEMENT = require('../../core/dom/element'),
        DRAG = require('./drag'),
        console = require('../../core/debug/console'),
        dragManager = {};
    return {
        /**
         *
         * @param {Array | Object} confs
         * 数组(元素与util.effect.drag的conf参数相同)或conf配置对象
         */
        bind: function (confs) {
            if (!TYPE.isArr(confs)) {
                confs = [confs];
            }
            FOR_EACH(confs, function (conf) {
                var guid,
                    dragObj;
                if (!conf) {
                    return;
                }
                conf.target = ELEMENT(conf.target);
                if (!conf.target) {
                    return;
                }
                guid = GUID.auto(conf.target);
                if (!guid) {
                    return;
                }
                dragObj = dragManager[guid];
                //只可以绑定一次拖拽效果，之前绑定的会自动解除
                //最后一次绑定的生效
                if (dragObj && dragObj.destroy) {
                    dragObj.destroy();
                }
                dragManager[guid] = DRAG(conf);
            });

        },
        /**
         *
         * @param {HTMLElement} els
         */
        unbind: function (els) {
            if (!TYPE.isArr(els)) {
                els = [els];
            }
            FOR_EACH(els, function (el) {
                var guid,
                    dragObj;
                el = ELEMENT(el);
                if (!el) {
                    return;
                }
                guid = GUID.get(el);
                if (guid) {
                    dragObj = dragManager[guid];
                    if (dragObj && dragObj.destroy) {
                        try {
                            dragObj.destroy();
                        } catch (ex) {
                            console.error('[util.effect.dragM] ' +
                                'unbind() error !');
                        }
                    }
                    delete dragManager[guid];
                }
            });
        }
    };
});
