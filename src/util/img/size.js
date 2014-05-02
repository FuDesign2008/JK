/**
 * 获取图片的原始尺寸
 * @author FuDesign2008@163.com
 * @date   2011-10-28
 * @time   下午03:26:52
 */


define(function (require) {
    var TYPE =  require('../../core/obj/type'),
        PARAM =  require('../../core/obj/param'),
        DATA_CACHE =  require('../../core/obj/dataCache'),
        sizeCache = DATA_CACHE();

    return {
        /**
         * @param {Object} conf
         * @param {String} conf.src    【必须】图片地址
         * @param {Boolean} conf.load   如果在本地未获取图片的尺寸数据，
         *       是否远程下载图片以获取图片尺寸，默认为true
         * @param {Function} conf.onSuccess   图片尺寸获取成功的回调函数
         * @param {Function} conf.onFail      图片尺寸获取失败的回调函数
         * @param {Function} conf.onResolve   提供给core/async/parallel 和
         *      core/async/queue
         */
        getSize: function (conf) {
            conf = PARAM({
                src: null,
                load: true,
                onSuccess: null,
                onFail: null
            }, conf);

            var runOnResolve = function () {
                    if (conf.onResolve) {
                        conf.onResolve();
                    }
                },
                confSrc,
                onSuccess,
                onFail,
                isFnOnSuccess,
                isFnOnFail,
                cachedSize,
                timeoutID,
                img,
                checkSize;

            if (!conf || !conf.src || !TYPE.isStr(conf.src)) {
                runOnResolve();
                return;
            }
            confSrc = conf.src;
            onSuccess = conf.onSuccess;
            onFail = conf.onFail;
            isFnOnSuccess = TYPE.isFn(onSuccess);
            isFnOnFail = TYPE.isFn(onFail);
            cachedSize = sizeCache.get(confSrc);
            //
            if (cachedSize) {
                if (isFnOnSuccess) {
                    onSuccess({
                        src: confSrc,
                        width: cachedSize.width,
                        height: cachedSize.height
                    });
                }
                runOnResolve();
                return;
            }
            if (conf.load === false) {
                if (isFnOnFail) {
                    onFail({
                        src: confSrc
                    });
                }
                runOnResolve();
                return;
            }
            ////////////////////////////to load img
            img = new Image();
            img.onload = function () {
                var w = img.width, h = img.height;
                window.clearTimeout(timeoutID);
                timeoutID = img.onload = img.onerror = img.onabort = null;
                img = null;
                sizeCache.set(confSrc, {
                    width: w,
                    height: h
                });
                if (isFnOnSuccess) {
                    onSuccess({
                        width: w,
                        height: h,
                        src: confSrc
                    });
                }
                runOnResolve();
            };
            img.onerror = img.onabort = function () {
                window.clearTimeout(timeoutID);
                timeoutID = img.onload = img.onerror = img.onabort = null;
                img = null;
                if (isFnOnFail) {
                    onFail({
                        src: confSrc
                    });
                }
                runOnResolve();
            };
            // 加载大图片， 比onload 更快, see http://www.planeart.cn/?p=1121;
            checkSize = function () {
                var fnSelf = checkSize,
                    w = img.width,
                    h = img.height;
                if (w && h) {
                    img.onload = img.onerror = img.onabort = null;
                    img = null;
                    sizeCache.set(confSrc, {
                        width: w,
                        height: h
                    });
                    if (isFnOnSuccess) {
                        onSuccess({
                            width: w,
                            height: h,
                            src: confSrc
                        });
                    }
                    runOnResolve();
                } else {
                    timeoutID = window.setTimeout(fnSelf, 50);
                }
            };
            //start to get size of image
            timeoutID = window.setTimeout(checkSize, 50);
            ///
            img.src = confSrc;
        },
        /**
         *
         * @param {String} src
         * @return {Object} obj.width, obj.height
         */
        getSizeFromCache: function (src) {
            return sizeCache.get(src);
        },
        /**
         * 获取所有缓存的数据
         * @return {Object}
         *          obj.src {Array} 所有图片地址的数组
         *          obj.size {Array} 所有图片大小的数组  size.width, size.height
         */
        getAllCache: function () {
            var obj = sizeCache.getAll() || {};
            return {
                src: obj.key,
                size: obj.val
            };
        },
        clearCache: function (src) {
            sizeCache.clear(src);
        },
        /**
         * 清空所有缓存数据
         */
        clearAllCache: function () {
            sizeCache.clearAll();
        }
    };
});
