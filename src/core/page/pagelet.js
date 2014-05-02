/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-12-13
 * @time   下午02:05:18
 */
//


define(function (require) {
    var START_WITH = require('../../core/str/startWith'),
        CHUNK = require('../../core/fn/chunk'),
        DOM_READY = require('../../core/event/domReady'),
        TYPE  = require('../../core/obj/type'),
        console = require('../../core/debug/console'),
        list = [],
        added = {};

    return {
        /**
         * @param {String} ns 命名空间
         * @param {Function} fn
         */
        add: function (ns, fn) {
            ns = String(ns);
            if (!START_WITH(ns, 'pagelet.')) {
                console.error('[util/page/pagelet.add()] 参数 ns 有误: ns=' +
                    ns);
                return;
            }
            if (added[ns] === true) {
                console.error('[util.page.pagelet.add()] ns="' + ns +
                         '" has already exist !');
                return;
            }
            if (TYPE.isFn(fn)) {
                list.push(fn);
                added[ns] = true;
            }
        },
        /**
         *
         * @param {Boolean} domReady 是否是domReady时(true)执行，还是立即执行(false);
         */
        start: function (domReady) {
            if (!list.length) {
                return;
            }
            var runIt = function () {
                CHUNK({
                    task: list,
                    time: 100,
                    delay: 50
                });
                //传递给 CHUNK 中的task是 list的副本
                //list.length = 0;
            };
            //
            if (domReady) {
                DOM_READY(runIt);
            } else {
                runIt();
            }
        }
    };
});
