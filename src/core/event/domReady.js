/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-8
 * @time   下午02:37:58
 */



define(function (require) {
    var TYPE = require('../obj/type'),
        DESTROY = require('../obj/destroy'),
        domReady = {
            init: function () {
                var that = this;
                that._handler = null;
                that._ieHandlerHasRun = false;
                that._isBind = false;
                that._deferredList = [];
            },
            addListener: function (fn) {
                var that = this;
                that._deferredList.push(fn);
                //
                if (!that._isBind) {
                    that._bind();
                    that._isBind = true;
                }
            },
            _run: function () {//按先后顺序执行
                var that = this;
                if (that._deferredList.length) {
                    (that._deferredList.shift())();
                    // wrap `_run()` for `this` keyword
                    window.setTimeout(function () {
                        that._run();
                    }, 10);
                } else {
                    DESTROY({
                        target: that
                    });
                    that = null;
                }
            },
            _bind: function () {
                var that = this,
                    state = document.readyState,
                    toplevel;
                //if has already ready
                if (state === 'complete' || state === 'interactive') {
                    that._run();
                    return;
                }
                //
                // Mozilla, Opera and webkit nightlies currently support this
                // event
                if (document.addEventListener) {
                    that._handler = function () {
                        document.removeEventListener('DOMContentLoaded',
                            that._handler, false);
                        window.removeEventListener('load', that._handler,
                                false);
                        that._run();
                    };
                    // Use the handy event callback
                    document.addEventListener('DOMContentLoaded',
                        that._handler, false);
                    // A fallback to window.onload, that will always work
                    window.addEventListener('load', that._handler, false);
                    // If IE event model is used
                } else if (document.attachEvent) {
                    that._handler = function () {
                        // IE6-IE8 onreadystatechange  document.readyState only
                        // has 'complete' and 'interactive'
                        document.detachEvent('onreadystatechange',
                            that._handler, false);
                        window.detachEvent('onload', that._handler, false);
                        that._ieHandlerHasRun = true;
                        that._run();
                    };
                    // ensure firing before onload,
                    // maybe late but safe also for iframes
                    document.attachEvent('onreadystatechange', that._handler);
                    // A fallback to window.onload, that will always work
                    window.attachEvent('onload', that._handler);
                    // If IE and not a frame
                    // continually check to see if the document is ready
                    toplevel = false;

                    try {
                        toplevel = window.frameElement == null;
                    } catch (e) {
                        // do not throw error
                    }
                    if (document.documentElement.doScroll && toplevel) {
                        that._doScrollCheck();
                    }
                }
            },
            _doScrollCheck: function () {
                var that = this;
                if (that && that._ieHandlerHasRun === false) {
                    try {
                        // If IE is used, use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        document.documentElement.doScroll('left');
                    } catch (ex) {
                        // wrap function for `this` keyword
                        window.setTimeout(function () {
                            that._doScrollCheck();
                        }, 10);
                        return;
                    }
                    that._handler();
                }
            }
        };
    //
    domReady.init();
    //
    return function (fn) {
        if (TYPE.isFn(fn)) {
            if (domReady && domReady.addListener) {
                domReady.addListener(fn);
            } else {
                fn();
            }
        }
    };
});





