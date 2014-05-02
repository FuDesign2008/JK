


define(function (require) {
    var INSERT_BEFORE = require('./insertBefore'),
        INSERT_AFTER = require('./insertAfter');

    /**
     * 比insertBefore 和 insertAfter更好的api
     * e.g.
     * var createElement = require('./createElement'),
     *     div = createElement('div'),
     *     button = ELEMENT('button');
     *  INSERT(div).after(button);
     *
     *
     * @param {Node} newNode
     * @return {Object}
     */
    return function (newNode) {
        return {
            /**
             * @param {Node} newNode
             */
            before: function (node) {
                INSERT_BEFORE(newNode, node);
            },
            /**
             * @param {Node} newNode
             */
            after: function (node) {
                INSERT_AFTER(newNode, node);
            }

        };
    };
});
