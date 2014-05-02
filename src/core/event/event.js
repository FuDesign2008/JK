/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-1
 * @time   上午11:46:31
 */
/**
 * Fixed event is based on DOM3 Events as specified by the ECMAScript Language
 * Binding
 * http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331
 * /ecma-script-binding.html
 * >>>>>>>>>>>>>>>>>>>>>>>>>ECMA stardard
 * >>>>>>>>>>RAW_PROPS
 * type
 * altKey
 * attrChange
 * attrName
 * bubbles
 * button   // -> 见which
 * cancelable
 * charCode // -> 见which
 * clientX  //ok
 * clientY  //ok
 * ctrlKey  //fixed
 * currentTarget
 * data
 * detail
 * eventPhase
 * fromElement
 * handler
 * keyCode // -> 见which
 * layerX
 * layerY
 * metaKey      //fixed
 * newValue
 * offsetX
 * offsetY
 * pageX    //fixed
 * pageY   //fixed
 * prevValue
 * relatedNode
 * relatedTarget //fixed
 * screenX  // ok
 * screenY  // ok
 * shiftKey
 * srcElement //见target
 * target   //fixed
 * toElement
 * view
 * wheelDelta
 * which    //fixed  -> 用于获取键盘事件的keyCode/charCode 或 鼠标事件的button
 * timeStamp //fixed
 * <<<<<<<<<<<<<<<<<<<RAW_PROPS
 * stopPropagation() // fixed
 * preventDefault()  // fixed
 * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<ECMA stardard
 * >>>>>>additional
 * stop()
 * getRawEvent()
 * destroy()
 * <<<<<<<additional
 */




define(function (require) {
    var FOR_EACH = require('../arr/forEach'),
        DESTROY = require('../obj/destroy'),
        RAW_PROPS = [
            'type',
            'altKey',
            'attrChange',
            'attrName',
            'bubbles',
            'button',
            'cancelable',
            'charCode',
            'clientX',
            'clientY',
            'ctrlKey',
            'currentTarget',
            'data',
            'detail',
            'eventPhase',
            'fromElement',
            'handler',
            'keyCode',
            'layerX',
            'layerY',
            'metaKey',
            'newValue',
            'offsetX',
            'offsetY',
            'pageX',
            'pageY',
            'prevValue',
            'relatedNode',
            'relatedTarget',
            'screenX',
            'screenY',
            'shiftKey',
            'srcElement',
            'target',
            'toElement',
            'view',
            'wheelDelta',
            'which',
            'timeStamp'
        ],
        fnFix = {
            target: function (raw) {
                var t = raw.target || raw.srcElement || document;
                // check if target is a textnode (safari)
                return t.nodeType === 3 ? t.parentNode : t;
            },
            relatedTarget: function (raw, target) {
                if (raw.relatedTarget) {
                    return raw.relatedTarget;
                }
                if (raw.fromElement) {
                    return raw.fromElement === target ?
                            raw.toElement : raw.fromElement;
                }
            },
            pageXY: function (raw, target) {
                var eventDoc,
                    doc,
                    body;
                /*jslint eqeq: true*/
                if (raw.pageX != null) {
                    return {
                        x: raw.pageX,
                        y: raw.pageY
                    };
                }
                if (raw.clientX != null) {
                    eventDoc = target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    return {
                        x: raw.clientX + ((doc && doc.scrollLeft) ||
                            (body && body.scrollLeft) || 0) -
                            ((doc && doc.clientLeft) ||
                            (body && body.clientLeft) || 0),
                        y: raw.clientY + ((doc && doc.scrollTop) ||
                            (body && body.scrollTop) || 0) -
                            ((doc && doc.clientTop) ||
                            (body && body.clientTop) || 0)
                    };
                }
            },
            /**
             * 对于键盘事件，返回keyCode/charCode
             * 对于鼠标事件【跨浏览器时，which只支持mousedown,
             * mouseup,其他事件which的值都是不可靠的】
             * 1 === left;
             * 2 === middle;
             * 3 === right
             * @param {Object} raw
             */
            which: function (raw) {
                var wh,
                    button;
                // Add which for key events
                /*jslint eqeq: true*/
                if (raw.which != null) {
                    wh = raw.which;
                    /*jslint eqeq: true*/
                } else if (raw.charCode != null || raw.keyCode != null) {
                    //在ff中keyCode为37， 但charCode为0
                    wh = raw.charCode || raw.keyCode;
                }
                if (wh) {
                    return wh;
                }
                if (raw.button != null) {
                    //The button property is set for onmousedown and onmouseup
                    //events in all browsers.
                    //@see
                    //http://help.dottoro.com/ljaxplfi.php  for more infomation
                    // 0 -> left
                    // 1 -> middle
                    // 2 -> right
                    if (document.implementation.hasFeature('MouseEvents',
                                '2.0')) {
                        button = raw.button;
                    } else {
                        // 采用 event.button的标准
                        button =  [0, 0, 2, 0, 1, 0, 2, 0][raw.button];
                    }
                    //
                    return [1, 2, 3][button];
                }
            },
            timeStamp: function () {
                return (new Date()).getTime();
            }
        };
    /**
     * Event 对象构造函数
     * @param {Object} rawEvent
     *
     */
    function Event(rawEvent) {
        this._init(rawEvent);
    }
    //mark it as fixed event
    Event.prototype._isFixedEvent = true;
    Event.prototype._init = function (rawEvent) {
        var that = this,
            temp;
        that._rawEvent = rawEvent;
        // has prevented default action ?
        that.hasPrevented = false;
        // has stopped propagation ?
        that.hasStopped = false;
        //to get properties for raw event
        FOR_EACH(RAW_PROPS, function (value) {
            that[value] = rawEvent[value];
        });
        // to fix attributes
        that.target = fnFix.target(rawEvent);
        //relatedTarget 事件属性返回与事件的目标节点相关的节点。
        //对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。
        //对于 mouseout 事件来说，该属性是离开目标时，鼠标指针进入的节点。
        //对于其他类型的事件来说，这个属性没有用。
        that.relatedTarget = fnFix.relatedTarget(rawEvent, that.target);
        //
        temp = fnFix.pageXY(rawEvent, that.target);
        //
        if (temp) {//有的事件是没有pageX, pageY的， 比如window的scroll事件
            that.pageX = temp.x;
            that.pageY = temp.y;
        }
        that.which = fnFix.which(rawEvent);
        // Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
        if (!that.metaKey && that.ctrlKey) {
            that.metaKey = that.ctrlKey;
        }
        // timeStamp is buggy for some events on Firefox
        // So we won't rely on the native value
        that.timeStamp = fnFix.timeStamp();
    };
    Event.prototype.preventDefault = function () {
        var that = this,
            rawEvent = that._rawEvent;
        if (!that.hasPrevented) {
            if (rawEvent.preventDefault) {
                rawEvent.preventDefault();
            } else {
                rawEvent.returnValue = false;
            }
            that.hasPrevented = true;
        }
    };
    Event.prototype.stopPropagation = function () {
        var that = this,
            rawEvent = that._rawEvent;
        if (!that.hasStopped) {
            if (rawEvent.stopPropagation) {
                rawEvent.stopPropagation();
            } else {
                rawEvent.cancelBubble = true;
            }
            that.hasStopped = true;
        }
    };
    Event.prototype.stop = function () {
        var that = this;
        that.preventDefault();
        that.stopPropagation();
    };
    Event.prototype.getRawEvent = function () {
        return this._rawEvent;
    };
    Event.prototype.destroy = function () {
        var that = this;
        DESTROY({
            target: that
        });
        that = null;
    };

    return function (event) {
        if (!event) {
            return;
        }
        if (event._isFixedEvent) {
            return event;
        }
        return new Event(event);
    };

});
