/**
 *  使得在TextareaElement/TextInputElement的内容可以格式一样的放在div类容器中
 * @author FuDesign2008@163.com
 * @date   2011-8-23
 * @time   下午09:38:42
 * @example
 *          var str = textarea.value;
 *          div.innerHTML = require('../str.input2div(str);
 */


define(function () {

    return function (str) {
            //& -> &amp;
        str = String(str).replace(/\&/g, '&amp;')
            //双引号
            .replace(/"/g, '&quot;')
            //小于号
            .replace(/</g, '&lt;')
            //大于号
            .replace(/>/g, '&gt;')
            //单引号
            .replace(/'/g, '&apos;')
            //2个英文空格->1个中文全角空格，
            .replace(/\u0020\u0020/g, '\u3000')
            //1个英文空格-> &nbsp;
            .replace(/\u0020/g, '&nbsp;')
            //2个不可分割空白字符（no-break space）->1个中文全角空格
            .replace(/\u00A0\u00A0/g, '\u3000')
            //1个不可分割空白字符（no-break space）->1个英文空格
            .replace(/\u00A0/g, '&nbsp;')
            //tab键->4个中文全角空格
            .replace(/\u0009/g, '\u3000\u3000\u3000\u3000')
            //2个垂直方向的tab键 -> 1个中文空格
            .replace(/\u000B\u000B/g, '\u3000')
            //1个垂直方向的tab键 -> 1个英文空格
            .replace(/\u000B/g, '&nbsp;')
            //IE换行
            .replace(/\r\n/g, '<br/>')
            //FF换行
            .replace(/\n/g, '<br/>')
            //段落分割符（paragraph separator）
            .replace(/\u2029/g, '<br/>')
            //行分割符（line separator）
            .replace(/\u2028/g, '<br/>')
            //换页符->英文空格
            .replace(/\u000C/g, '&nbsp;');
        return str;

    };
});
