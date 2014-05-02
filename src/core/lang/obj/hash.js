/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-20
 * @time   下午03:25:54
 */


define(function (require) {
    var TYPE  = require('./type'),
        FOR_OWN = require('./forOwn'),
        IS_EQUAL = require('./isEqual'),
        FOR_EACH = require('../arr/forEach'),
        DESTROY = require('./destroy'),
        hashFactory = function (obj) {
            var _hash = {
                    _init: function (conf) {
                        _hash._innerObj = {};
                        if (conf && TYPE.isObj(conf)) {
                            FOR_OWN(conf, function (val, key) {
                                _hash._innerObj[key] = val;
                            });
                        }
                    }
                },
                hash = {
                    isHash: function () {
                        return true;
                    },
                    /**
                     *
                     * @param {Array|String} key
                     */
                    has: function (key) {
                        var ret;
                        if (!key) {
                            return false;
                        }
                        if (TYPE.isArr(key)) {
                            ret = true;
                            FOR_EACH(key, function (_val) {
                                if (!_hash._innerObj.hasOwnProperty(_val)) {
                                    ret = false;
                                    //阻止 FOR_EACH 继续运行
                                    return false;
                                }
                            });
                            return ret;
                        }
                        return _hash._innerObj.hasOwnProperty(key);
                    },
                    /**
                     *
                     * @param {Array | String} key
                     */
                    get: function (key) {
                        var ret;
                        if (!key) {
                            return;
                        }
                        if (TYPE.isArr(key)) {
                            ret = {};
                            FOR_EACH(key, function (_val) {
                                if (!_hash._innerObj.hasOwnProperty(_val)) {
                                    ret[_val] = _hash._innerObj[_val];
                                }
                            });
                            return ret;
                        }
                        return _hash._innerObj[key];
                    },
                    /**
                     *
                     * @param {Object | String} key
                     * @param {Any} val
                     */
                    set: function (key, val) {
                        if (!key) {
                            return;
                        }
                        if (TYPE.isStr(key)) {
                            _hash._innerObj[key] = val;
                        } else if (TYPE.isObj) {
                            FOR_OWN(key, function (_val, _key) {
                                _hash._innerObj[_key] = _val;
                            });
                        }
                    },
                    /**
                     *
                     * @param {Object | String} key
                     */
                    remove: function (key) {
                        if (!key) {
                            return;
                        }
                        if (TYPE.isStr(key)) {
                            if (hash.has(key)) {
                                delete _hash._innerObj[key];
                            }
                        } else if (TYPE.isObj(key)) {
                            FOR_OWN(key, function (_val, _key) {
                                if (hash.has(_key)) {
                                    delete _hash._innerObj[_key];
                                }
                            });
                        }
                    },
                    /**
                     *
                     * @param {Function} fn
                     */
                    each: function (fn) {
                        if (TYPE.isFn(fn)) {
                            FOR_OWN(_hash._innerObj, function (val, key) {
                                if (!fn(val, key)) {
                                    return;
                                }
                            });
                        }
                    },
                    /**
                     * @return {Array}
                     * 返回值未必与 values()方法的返回值一一对应
                     */
                    keys: function () {
                        var ret = [];
                        FOR_OWN(_hash._innerObj, function (val, key) {
                            ret.push(key);
                        });
                        return ret;
                    },
                    /**
                     * @return {Array}
                     * 返回值未必与 keys()方法的返回值一一对应
                     */
                    values: function () {
                        var ret = [];
                        FOR_OWN(_hash._innerObj, function (val) {
                            ret.push(val);
                        });
                        return ret;
                    },
                    /**
                     *
                     * @param {Object} obj
                     */
                    mergeTo: function (obj) {
                        if (TYPE.isObj(obj)) {
                            FOR_OWN(_hash._innerObj, function (val, key) {
                                obj[key] = val;
                            });
                        }
                        return obj;
                    },
                    toObject: function () {
                        var obj = {};
                        FOR_OWN(_hash._innerObj, function (val, key) {
                            obj[key] = val;
                        });
                        return obj;
                    },
                    /**
                     * @param {Object | core.obj.hash} obj
                     * @return {Boolean}
                     */
                    isEqual: function (obj) {
                        if (obj && TYPE.isFn(obj.isHash) && obj.isHash()) {
                            obj = obj.toObject();
                        }
                        if (!obj) {
                            return false;
                        }
                        return IS_EQUAL(obj, _hash._innerObj);

                    },
                    /**
                     * @param  {Boolean}
                     * 是否对key和val会使用encodeURIComponent进行编码，默认为true
                     * @return {String}
                     */
                    toQueryString: function (encode) {
                        var html = [];
                        FOR_OWN(_hash._innerObj, encode !== false ?
                                function (val, key) {
                                    html.push(encodeURIComponent(String(key)) +
                                        '=' + encodeURIComponent(String(val)));
                                } : function (val, key) {
                            html.push(key + '=' + val);
                        });
                        return html.join('&');
                    },
                    /**
                     * @param  {Boolean}
                     * 是否对key和val会使用encodeURIComponent进行编码，默认为true
                     * @return {String} 严格的JSON字符串
                     */
                    toJSON: function (encode) {
                        var html = ['{'];
                        FOR_OWN(_hash._innerObj, encode !== false ?
                                function (val, key) {
                                    html.push('"' +
                                        encodeURIComponent(String(key)) +
                                        '":"' +
                                        encodeURIComponent(String(val)) + '"');
                                    html.push(',');
                                } : function (val, key) {
                            html.push('"' + key + '":"' + val + '"');
                            html.push(',');
                        });
                        html[html.length - 1] = '}';
                        return html.join('');
                    },
                    destroy: function () {
                        DESTROY({
                            target: hash
                        });
                        hash = null;
                        DESTROY({
                            target: _hash
                        });
                        _hash = null;
                    }
                };

            _hash._init(obj);
            return hash;
        };


    return hashFactory;
});
