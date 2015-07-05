/**
 * 将字符串模板中的{{name}} 进行值替换
 * @author FuDesign2008@163.com
 * @date   2011-11-14
 * @time   下午04:44:13
 * @example
 *          var temp ='hello, {{userName}}, you are a {{sex}} cat!';
 *          var data = {
 *                      userName:'kitty',
 *                      sex:'female'
 *                      }
 *          //hello, kitty, you are a female cat!
 *          var hint = substitute(temp, data);
 */



define(function (require) {
    var GET_TYPE = require('./getType'),
        REG = /\{\{([0-9a-zA-Z_\-]+)\}\}/g;

    return function (str, data) {
        if (str && data && GET_TYPE(str) === 'string' &&
                GET_TYPE(data) === 'object') {
            str = str.replace(REG, function (whole, $1) {
                return data.hasOwnProperty($1) ? data[$1] : whole;
            });
            return str;
        }
    };
});
