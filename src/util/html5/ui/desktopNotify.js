/**
 * 桌面通知，目前只支持webkit浏览器
 * 注意：
 *      1. it's very important to remember that the requestPermission method
 *   only works in event handlers triggered by a user action, like mouse or
 *   keyboard events, in order to avoid unsolicited infobars.
 *   这将导致：如果没有已经允许权限， html5.ui.desktopNotify.create() 只能在事件监听器中使用
 *
 * see for more
 *   http://www.html5rocks.com/en/tutorials/notifications/quick/
 *   http://www.chromium.org/developers/design-documents
 *   /desktop-notifications/api-specification
 *
 * @author FuDesign2008@163.com
 * @date   2012-1-18
 * @time   上午11:33:32
 */


define(function (require) {

    var TYPE = require('../../core/obj/type'),
        PARAM = require('../../core/obj/param'),
        FOR_OWN = require('../../core/obj/forOwn'),
        console = require('../../core/debug/console'),
        SUPPORT = require('../bom/support'),
        PERMISSION_ALLOWED = 0,
        //PERMISSION_NOT_ALLOWED = 1,
        //PERMISSION_DENIED = 2,
        notifyCenter = window.webkitNotifications;

    return {
        /**
         * 是否支持destop notification
         * @return {Boolean}
         */
        support: function () {
            return SUPPORT.notification;
        },
        /**
         * check permission
         * @return {Integer}
         *                  0 -> PERMISSION_ALLOWED,
         *                  1 -> PERMISSION_NOT_ALLOWED,
         *                  2 -> PERMISSION_DENIED
         */
        check: function () {
            if (SUPPORT.notification) {
                return notifyCenter.checkPermission();
            }
        },
        /**
         * request permisson
         * @param {Function} callback
         */
        request: function (callback) {
            if (SUPPORT.notification) {
                notifyCenter.requestPermission(callback);
            }
        },
        /**
         *  创建 Destop notification
         * @param {Object} conf
         * @param {Boolean} conf.autoShow 是否自动显示，默认为true
         * @param {String} conf.type 为'simple' 或'html'， 默认为'simple'
         * @param {String} conf.url  当type为'simple'时，表示icon图片的url，【可选】
         *                                 当type为'html'时，表示页面url,【必须】
         * @param {String} conf.title 仅当type为'simple'时可用
         * @param {String} conf.content 仅当type为'simple'时可用
         *              //
         * @param {Function} conf.onDisplay
         * @param {Function} conf.onError
         * @param {Function} conf.onClose
         *              //
         * @return {Object} Notification 对象，obj.show(), obj.cancel()
         */
        create: function (conf) {
            var that = this,
                notify;
            if (!SUPPORT.notification) {
                console.log('[html5/ui/desktopNotify]: ' +
                        'notification is not support!');
                return;
            }
            conf = PARAM({
                autoShow: true,
                type: 'simple',
                url: null,
                title: null,
                content: null,
                onDisplay: null,
                onError: null,
                onClose: null
            }, conf);
            if (!conf.url || that.check() !== PERMISSION_ALLOWED) {
                return;
            }
            //
            if (conf.type === 'html') {
                notify = notifyCenter.createHTMLNotification(conf.url);
            } else {
                notify = notifyCenter.createNotification(conf.url, conf.title,
                        conf.content);
            }
            if (notify) {
                FOR_OWN(['onDisplay', 'onError', 'onClose'], function (val) {
                    if (TYPE.isFn(conf[val])) {
                        notify[val.toLowerCase()] = conf[val];
                    }
                });
                if (conf.autoShow) {
                    notify.show();
                }
                return notify;
            }
        }
    };
});

