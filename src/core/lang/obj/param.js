/**
 * 用于复制参数，返回一个与_default结构一致的新对象，
 * _default对象中存在的属性，值会被覆盖
 * 支持多层，支持多个配置参数，见示例
 * @author FuDesign2008@163.com
 * @date   2011-8-15
 * @time   下午07:36:23
 * @example
 *          var param = require('./param');
 *          var defaultConf ={
 *              reload:false,
 *              rand:true,
 *              script:{
 *                  url:null,
 *                  type:'text/javascript',
 *                  charset:'utf-8'
 *              }
 *          }
 *          var conf = param(defaultConf, {
 *                  reload:true
 *          }, {
 *              script:{
 *                  url:'http://ajax.googleapis.com/ajax/libs/' +
 *                  'jquery/1.4.2/jquery.min.js'
 *              }
 *          })
 */


define(function (require) {
    var GET_TYPE = require('./getType'),
        TO_ARRAY = require('../arr/toArray'),
        FOR_EACH = require('../arr/forEach'),
        FOR_OWN = require('./forOwn'),
        IS_PLAIN_OBJ = require('./isPlainObj');
    //
    return function () {
        var conf = {},
            fnSelf = arguments.callee,
            type;
        FOR_EACH(TO_ARRAY(arguments), function (item) {
            if (IS_PLAIN_OBJ(item)) {
                FOR_OWN(item, function (value, prop) {
                    /*if (value && value.nodeName) {
                         conf[prop] = value;
                         return;
                    }
                    if (IS_PLAIN_OBJ(value)) {
                        conf[prop] = fnSelf(value);
                    } else if (TYPE.isArr(value)) {
                        conf[prop] = [].concat(value);
                    }else if (!TYPE.isUndef(value)) {
                        conf[prop] = value;
                    }*/
                    //出于性能考虑
                    type = GET_TYPE(value);
                    if (type === 'object' && IS_PLAIN_OBJ(value)) {
                        conf[prop] = fnSelf(value);
                    } else if (type === 'array') {
                        conf[prop] = [].concat(value);
                        /*jslint eqeq:true*/
                    } else if (value != null) {
                        conf[prop] = value;
                    }
                });
            }
        });
        return conf;
    };
});
