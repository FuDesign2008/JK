/**
 *  对 ajax 的封装
 *  只有同一时间只有一个请求的对象
 * @author FuDesign2008@163.com
 * @date   2012-3-2
 * @time   下午05:07:05
 */



define(function (require) {
    var TYPE = require('../../core/obj/type'),
        DESTROY = require('../../core/obj/destroy'),
        AJAX = require('../../core/io/ajax');
    /**
     * @return {Object}
     **/
    return function () {
        var ajaxObj = null;

        return {
            /**
             *  参数同core/io/ajax方法的参数
             *  @see AJAX
             */
            ajax: function (conf) {
                this.stop();
                var onResolve = conf.onResolve;
                conf.onResolve = function () {
                    var that = this;
                    if (TYPE.isFn(onResolve)) {
                        onResolve.apply(that, arguments);
                    }
                    ajaxObj = null;
                };
                //发送请求
                ajaxObj = AJAX(conf);
            },
            stop: function () {
                if (ajaxObj) {
                    try {
                        ajaxObj.abort();
                    } catch (ex) {
                        //do nothing
                    }
                    ajaxObj = null;
                }
            },
            destroy: function () {
                var that = this;
                that.stop();
                DESTROY({
                    target: that
                });
            }
        };
    };
});

