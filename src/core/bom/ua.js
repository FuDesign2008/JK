/**
 * 根据userAgent探测浏览器信息
 * @author FuDesign2008@163.com
 * @date   2011-8-21
 * @time   上午11:39:47
 */


/*jshint maxcomplexity:19*/
define(function () {

    var ua = navigator.userAgent.toLowerCase(),
        external = window.external || '',
        core,
        m,
        extra,
        version,
        os,
        numberify = function (s) {
            var c = 0;
            return parseFloat(s.replace(/\./g, function () {
                c += 1;
                return (c === 1) ? '' : '.';
            }));
        };

    try {
        if ((/windows|win32/).test(ua)) {
            os = 'windows';
        } else if ((/macintosh/).test(ua)) {
            os = 'macintosh';
        } else if ((/rhino/).test(ua)) {
            os = 'rhino';
        }
        if ((m = ua.match(/applewebkit\/([^\s]*)/)) && m[1]) {
            core = 'webkit';
            version = numberify(m[1]);
        } else if ((m = ua.match(/presto\/([\d.]*)/)) && m[1]) {
            core = 'presto';
            version = numberify(m[1]);
        } else if ((m = ua.match(/msie\s([^;]*)/))) {
            core = 'trident';
            version = 1.0;
            if ((m = ua.match(/trident\/([\d.]*)/)) && m[1]) {
                version = numberify(m[1]);
            }
        } else if (/gecko/.test(ua)) {
            core = 'gecko';
            version = 1.0;
            if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                version = numberify(m[1]);
            }
        }
        /*jshint camelcase: false*/
        if (/world/.test(ua)) {
            extra = 'world';
        } else if (/360se/.test(ua)) {
            extra = '360';
        } else if ((/maxthon/.test(ua)) ||
                typeof external.max_version === 'number') {
            extra = 'maxthon';
        } else if (/tencenttraveler\s([\d.]*)/.test(ua)) {
            extra = 'tt';
        } else if (/se\s([\d.]*)/.test(ua)) {
            extra = 'sogou';
        }
    } catch (e) {
        //do nothing
    }

    return {
        //系统
        'OS': os,
        'WIN': os === 'windows',
        'MAC': os === 'macintosh',
        'RHINO': os === 'rhino',
        //排版引擎
        'CORE': core,
        'VERSION': version,
        'WEBKIT': core === 'webkit',
        'PRESTO': core === 'presto',
        'TRIDENT': core === 'trident',
        'GECKO': core === 'gecko',
        //浏览器版本
        'IE': /msie/.test(ua),
        'OPERA': /opera/.test(ua),
        'MOZ': /gecko/.test(ua) && !(/(compatible|webkit)/.test(ua)),
        'IE5': /msie 5 /.test(ua),
        'IE55': /msie 5\.5/.test(ua),
        'IE6': /msie 6/.test(ua),
        'IE7': /msie 7/.test(ua),
        'IE8': /msie 8/.test(ua),
        'IE9': /msie 9/.test(ua),
        'SAFARI': !(/chrome\/([\d.]*)/.test(ua)) &&
                /\/([\d.]*) safari/.test(ua),
        'CHROME': /chrome\/([\d.]*)/.test(ua),
        //国内
        'MATHON': extra === 'maxthon',
        'WORLD': extra === 'world',
        '360': extra === '360',
        'TT': extra === 'tt',
        'SOGOU': extra === 'sogou',
        //移动
        'IPAD': /\(ipad/.test(ua),
        'IPHONE': /\(iphone/.test(ua),
        'ITOUCH': /\(itouch/.test(ua),
        'MOBILE': /mobile/.test(ua)
    };
});
