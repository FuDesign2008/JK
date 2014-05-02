/**
 *  console.log console.error的替代品
 *
 *  window.DEBUG  实时控制log的开关,默认为关
 *  window.ALERT 当使用window.alert时，实时控制log缓存
 *
 *  obj.log(object);
 *  obj.error(object);
 *  obj.printLog();
 *
 * @author fuyg@rd.netease.com
 * @date   2012-07-19
 * @time   15:21:23
 */



define(function (require) {
    var GET_TYPE = require('../obj/getType'),
        UA = require('../bom/ua'),
        ///////////////////////////////////// panel 对象
        WIN = window,
        noop = function () {},
        panel = {
            log: noop,
            error: function (msg) {
                panel.log('[ERROR]: ' + msg);
            },
            printLog: noop
        },
        logList = [],
        logLine,
        consoleLog,
        // 是否有控制面板，缺少window, 在ie6下会报错
        hasLog = !!(WIN.console && WIN.console.log),
        //see http://getfirebug.com/wiki/index.php/Console_API
        methods = [
            //'log',
            'debug',
            'info',
            'warn',
            //'error',
            'assert',
            'clear',
            'dir',
            'dirxml',
            'trace',
            'group',
            'groupEnd',
            'time',
            'timeEnd',
            'timeStamp',
            'profile',
            'profileEnd',
            'count',
            'exception',
            'table'
        ],
        retObj = {},
        applyMethod = function (method) {
            return function () {
                if (WIN.DEBUG) {
                    WIN.console[method].apply(WIN.console, arguments);
                }
            };
        },
        i,
        len = methods.length,
        name;

    //移动浏览器应该没有console
    //if (UA.IPAD || UA.IPHONE || UA.ITOUCH || UA.MOBILE) {
        //hasLog = false;
    //}
    ///
    if (!hasLog) {
        panel.printLog = function () {
            WIN.alert(logList.join('\n'));
            logList.length = 0;
        };
    }
    //
    if (UA.IE || !hasLog) {
        if (hasLog) {
            logLine = WIN.console.log;
        } else {
            logLine = function (msg) {
                logList.push(msg);
                if (logList.length >= (WIN.ALERT_CACHE || 50)) {
                    panel.printLog();
                }
            };
        }
        /**
         *
         * @param {Object} obj
         * @param {String} blank  空格字符,默认为''
         * @param {Boolean} logSelf  是否log自身, 默认为true
         * @param {Integer} blankExtra  blank 的额外长度, 默认为0
         */
        consoleLog = function (obj, blank, logSelf, blankExtra) {
            blank = blank || '';
            logSelf = logSelf !== false;
            blankExtra = blankExtra || 0;
            var type = GET_TYPE(obj),
                temp,
                temp2,
                fnSelf = consoleLog,
                i,
                l,
                prop;
            temp = blank.length;
            if (!logSelf && temp) {
                temp2 = [];
                temp2.length = temp + 1 + blankExtra;
                blank = temp2.join(' ');
            }
            switch (type) {
            case 'array':
                if (logSelf) {
                    logLine(blank + '[ ' + obj.join(',') + ' ] :');
                }
                blank = blank + '+--';
                l = obj.length;
                for (i = 0; i < l; i++) {
                    temp = obj[i];
                    temp2 = GET_TYPE(temp);
                    blankExtra = '[' + i + ']: ';
                    logLine(blank + blankExtra + temp);
                    if ((temp2 === 'object' && temp.hasOwnProperty) ||
                            (temp2 === 'array')) {
                        fnSelf(temp, blank, false, blankExtra.length);
                    }
                }
                break;
            case 'object':
                if (logSelf) {
                    logLine(blank + obj + ' :');
                }
                blank = blank + '+--';
                if (obj && obj.hasOwnProperty) {
                    for (prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            temp = obj[prop];
                            temp2 = GET_TYPE(temp);
                            blankExtra = prop + ': ';
                            logLine(blank + blankExtra + temp);
                            if ((temp2 === 'object' && temp.hasOwnProperty) ||
                                    (temp2 === 'array')) {
                                fnSelf(temp, blank, false,
                                    blankExtra.length);
                            }
                        }
                    }
                }
                break;
            default:
                logLine(blank + obj);
                break;
            }
        };
        ///
        panel.log = function (obj) {
            consoleLog(obj);
        };
    } else {
        panel.log = function (obj) {
            WIN.console.log(obj);
        };
    }
    /////////////////////////////////////

    /////////////////////////////////////
    for (i = 0; i < len; i++) {
        name = methods[i];
        if (WIN.console && WIN.console[name]) {
            retObj[name] = applyMethod(name);
        }
    }
    retObj.log =  function (msg) {
        if (WIN.DEBUG) {
            panel.log(msg);
        }
    };
    retObj.error = function (msg) {
        if (WIN.DEBUG) {
            panel.error(msg);
        }
    };
    retObj.pringLog = function () {
        if (WIN.DEBUG) {
            panel.printLog();
        }
    };
    //
    //WIN.onerror = function () {
        //var args = arguments,
            //l = args.length,
            //i,
            //out = [];
        //retObj.error('window.onerror start...');
        //for (i = 0; i < l; i++) {
            //retObj.log(args[i]);
        //}
        //retObj.error('window.onerror end');

    //};

    return retObj;
});

