


define(function (require, exports) {
    var NODE_TYPE = require('./nodeType'),
        div,
        init = function () {
            var cssText = 'position:absolute;top:-9999px;left:-9999px;';
            if (!div) {
                div = document.createElement('div');
                div.style.cssText = cssText;
                document.getElementsByTagName('head')[0].appendChild(div);
            }
        };
    /**
     *  页面统一使用的隐藏容器。惰性初始化。
     *  即使引用了该文件，但如果方法未使用，不会创建容器。
     *  @return {Object}
     *
     */
    return {
        /**
         * @param {Node}
         *
         */
        appendChild : function (node) {
            init();
            if (NODE_TYPE.isNode(node)) {
                div.appendChild(node);
            }
        },
        /**
         * @param {Node}
         *
         */
        removeChild : function (node) {
            if (div && NODE_TYPE.isNode(node)) {
                try {
                    div.removChild(node);
                } catch (ex) {
                    //do nothing
                }
            }
        }
    };
});
