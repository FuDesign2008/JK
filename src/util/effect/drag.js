/**
 *  HTMLElement的拖拽效果
 *  1) 推荐使用util.effect.dragM来绑定和移除拖拽效果
 *  2) conf.start, conf.drag, conf.end 监听器中this关键字指向conf.target对象
 * @author FuDesign2008@163.com
 * @date   2011-9-21
 * @time   下午01:45:56
 */




define(function (require) {

    var TYPE = require('../../core/obj/type'),
        UNIQUE = require('../../core/math/unique'),
        FOR_EACH = require('../../core/arr/forEach'),
        PARAM = require('../../core/obj/param'),
        ELEMENT = require('../../core/dom/element'),
        GET_STYLE = require('../../core/dom/getStyle'),
        SET_STYLE = require('../../core/dom/setStyle'),
        LOCATE_OFFSET_PARENT = require('../../core/dom/locateOffsetParent'),
        BIND = require('../../core/event/bind'),
        UNBIND = require('../../core/event/unbind'),
        DRAG_NS =  '.util_event_drag';

    /**
     *
     * @param {Object} conf
     * @param {HTMLElement} conf.target  目标元素
     * @param {Array} conf.related
     * @param {Boolean} conf.horizontal
     * 是否允许target水平方向位置变动，默认为true
     * @param {Boolean} conf.vertical    是否允许target竖直方向位置变动,
     * 默认为true
     * @param {Boolean} conf.disableSelect
     * 是否禁止选择拖动对象的内容，默认为true
     *              //以下监听器的this关键字指向conf.target对象
     * @param {Function} conf.start   开始拖拽的监听函数
     * @param {Function} conf.drag   拖拽过程中的监听函数
     * @param {Function} conf.end   拖拽结束的监听函数
     * @param {Array} conf.related  拖动时也跟着动的元素数组，数组元素结构为
     * obj.target, obj.horizontal, obj.vertical
     */
    return function (conf) {
        //////////////// to init values
        conf = PARAM({
            target: null,
            horizontal: true,
            vertical: true,
            disableSelect: true,
            start: null,
            drag: null,
            end: null,
            related: null
        }, conf);
        if (!conf || !conf.target) {
            return;
        }
        var eventNS = DRAG_NS + '_' + UNIQUE(),
            unselectNS = eventNS + '_unslect',
            lastMouseX,
            lastMouseY,
            lastXY,
            unselect_event = null,
            unselect_css = null,
            unselect_val = null,
            disableSelect = conf.disableSelect,
            target = conf.target,
            related = [],
            getLastXY,
            disableSelectFn,
            cancelDisableSelect,
            updatePosition;
        if (TYPE.isArr(conf.related) && conf.related.length) {
            FOR_EACH(conf.related, function (obj) {
                var node = ELEMENT(obj.target);
                if (obj && node) {
                    related.push({
                        target: node,
                        horizontal: obj.horizontal !== false,
                        vertical: obj.vertical !== false
                    });
                }
            });
            if (!related.length) {
                related = null;
            }
        }
        //////////////// useful tool kits
        getLastXY = function () {
            var arr = [conf],
                ret = [];
            if (related) {
                arr = arr.concat(related);
            }
            FOR_EACH(arr, function (obj) {
                ret.push(LOCATE_OFFSET_PARENT(obj.target) ||
                    {
                        x: 0,
                        y: 0
                    });
            });
            return ret;
        };
        disableSelectFn = function () {
            if (!disableSelect) {
                return;
            }
            if (unselect_event == null) {
                 //Some day in the future?
                if (!TYPE.isUndef(target.style.userSelect)) {
                    unselect_css = 'userSelect';
                } else if (!TYPE.isUndef(target.style.webkitUserSelect)) {
                    //Webkit route
                    unselect_css = 'webkitUserSelect';
                } else if (!TYPE.isUndef(target.style.MozUserSelect)) {
                    //Firefox route
                    unselect_css = 'MozUserSelect';
                } else if (!TYPE.isUndef(target.onselectstart)) {
                    //IE route
                    BIND(target, 'selectstart' + unselectNS, function (event) {
                        event.preventDefault();
                    });
                } else {//All other route (ie: Opera)
                    BIND(target, 'mousedown' + unselectNS, function (event) {
                        event.preventDefault();
                    });
                }
                //
                if (unselect_css) {
                    unselect_val = GET_STYLE(target, unselect_css) || '';
                    unselect_event = false;
                } else {
                    unselect_event = true;
                }
            }
            if (unselect_event === false) {
                SET_STYLE(target, unselect_css, 'none');
            }
        };
        cancelDisableSelect = function () {
            if (!disableSelect) {
                return;
            }
            if (unselect_event) {
                UNBIND(target, unselectNS);
            } else {
                SET_STYLE(target, unselect_css, unselect_val);
            }
        };
        /**
         *
         * @param {Object} moveBy, moveBy.x, moveBy.y
         */
        updatePosition = function (moveBy) {
            var arr = [conf];
            if (related) {
                arr = arr.concat(related);
            }
            FOR_EACH(arr, function (obj, index) {
                if (obj.horizontal) {
                    SET_STYLE(obj.target, 'left',
                        (lastXY[index].x + moveBy.x) + 'px');
                }
                if (obj.vertical) {
                    SET_STYLE(obj.target, 'top',
                        (lastXY[index].y + moveBy.y) + 'px');
                }
            });
        };

        /////////////// to bind events
        BIND(target, 'mousedown' + eventNS, function (eMouseDown) {
            lastMouseX = eMouseDown.pageX;
            lastMouseY = eMouseDown.pageY;
            lastXY = getLastXY();
            UNBIND(document, eventNS);
            //
            BIND(document, 'mousemove' + eventNS, function (eMouseMove) {
                updatePosition({
                    x: eMouseMove.pageX - lastMouseX,
                    y: eMouseMove.pageY - lastMouseY
                });
                if (TYPE.isFn(conf.drag)) {
                    conf.drag.apply(target, [eMouseMove]);
                }
            });
            //
            BIND(document, 'mouseup' + eventNS, function (eMouseUp) {
                updatePosition({
                    x: eMouseUp.pageX - lastMouseX,
                    y: eMouseUp.pageY - lastMouseY
                });
                UNBIND(document, eventNS);
                if (TYPE.isFn(conf.end)) {
                    conf.end.apply(target, [eMouseUp]);
                }
            });
            //
            if (TYPE.isFn(conf.start)) {
                conf.start.apply(target, [eMouseDown]);
            }
        });
        //
        disableSelectFn();
        //
        return {
            destroy: function () {
                cancelDisableSelect();
                UNBIND(target, eventNS);
                UNBIND(document, eventNS);
            }
        };

    };
});

