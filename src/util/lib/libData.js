/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-3
 * @time   下午04:25:52
 */


define(function (require) {
    var DATA_CACHE = require('../../core/obj/dataCache'),
        libs = DATA_CACHE(),
        GOOGLE_AJAX_LIBS = 'https://ajax.googleapis.com/ajax/libs/';
    // 通用操作框架
    libs.set('jquery', GOOGLE_AJAX_LIBS + 'jquery/1.6.4/jquery.min.js');
    libs.set('jquery_ui',
        GOOGLE_AJAX_LIBS + 'jqueryui/1.8.16/jquery-ui.min.js');
    libs.set('swfobject', GOOGLE_AJAX_LIBS + 'swfobject/2.2/swfobject.js');
    libs.set('prototype', GOOGLE_AJAX_LIBS + 'prototype/1.7.0.0/prototype.js');
    //图形图像
    libs.set('raphael', 'https://raw.github.com/' +
        'DmitryBaranovskiy/raphael/master/raphael-min.js');
    //
    return libs;

});
