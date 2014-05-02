/**
 *  获取原生的浏览器事件
 */



define(function (require) {
    var IS_RAW =  require('./isRaw'),
        STEPS = 50;
    /**
     * getRaw() should be used in event listener
     * e.g.
     *      var BIND = require('./bind'),
     *          ELEMENT = require('./element'),
     *          button = ELEMENT('button_id');
     *      var otherHandler = function () {
     *          //we can get raw event here even passing no parameters to
     *          //`otherHandler` function
     *          var rawEvent = GET_RAW();
     *      }
     *
     *      BIND(button, 'click', function (event, data) {
     *          //do something
     *          otherHandler();
     *      });
     *
     *
     */
    return function () {
        var caller,
            counter = 0,
            event;
        if (window.event) {
            return window.event;
        }

        caller = arguments.callee.caller;
        /*jslint eqeq:true */
        while (caller != null && counter < STEPS) {
            event = caller['arguments'][0];
            // whether is fixed Event object
            if (event && event._isFixedEvent && event.getRawEvent) {
                return event.getRawEvent();
            }
            if (IS_RAW(event)) {
                return event;
            }
            counter += 1;
            caller = caller.caller;
        }
        return event;
    };

});
