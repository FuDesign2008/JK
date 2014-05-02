



define(function () {
    ///
    var GENERAL = {
            'Boolean': 'boolean',
            'Number': 'number',
            'String': 'string',
            'Function': 'function',
            'Array': 'array',
            'Date': 'date',
            'RegExp': 'regexp',
            'Object': 'object'
        },
       // var PATTERN = /\[object\s+([a-z]+)\s*\]/i;
       //出于性能考虑
        PATTERN = /\[object ([a-z]+)\]/i,
        TO_STRING  = Object.prototype.toString;
    /**
     *   检查类型
     * @param {Object} o
     * @returns {String} 返回的值可能为
     *          undefined, null, string, boolean, number, array, function
     *          date, regexp, object常用类型
     *          默认为object
     */
    return function (o) {
        /*jslint eqeq: true */
        return o == null ? String(o) :
                (GENERAL[(PATTERN.exec(TO_STRING.call(o))[1])] || 'object');
    };
});

