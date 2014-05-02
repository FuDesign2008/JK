


define(function () {
    /**
     * @param {Object} o
     * @param {String} tag
     *
     */
    return function (o, tag) {
        tag = String(tag).toLowerCase();
        return (!o || !o.nodeName || !tag) ?
                false : String(o.nodeName).toLowerCase() === tag;
    };
});
