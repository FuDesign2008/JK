/**
 *  为面向对象提供工具函数,创建类构造器
 *  注意：1.只能有一个父类,父类的init方法尽量为空方法
 *        2. 下划线( _ )开头的方法表示是私有方法
 * @author FuDesign2008@163.com
 * @date 2011-8-17
 * @time 上午11:16:56
 */



define(function (require) {

    var TYPE = require('../obj/type'),
        FOR_OWN = require('../obj/forOwn'),
        console = require('../debug/console');
    //createClass方法创建的所有类的基类
    function Atom(conf) {
        this.__init(conf);
    }
    Atom.prototype = {
        __classChain: Atom,
        __classNames: 'Atom',
        __init: function (/*conf*/) {
        },
        getClassChain: function () {
            return this.__classChain;
        },
        getClassNames: function () {
            return this.__classNames;
        },
        destroy: function () {
            //abstract method
        }
    };
    //
    function Blank() {
    }
    /**
     *
     * @param {Object} conf
     * @param {} conf.parent  {Function}可选，父类，默认为Atom
     * @param {} conf.name   {String} 必选，类名
     * @param {} conf.init   {Function} 可选，初始化方法，默认为function ()
     *              {}， this关键字执行该类
     * @param {} conf.method  {Obejct}
     *              必选，本类的方法列表,this关键字执行该类，key-value对象,
     *              属性（【没有公有属性】）必须在初始化方法init中定义
     */
    return function (conf) {
        if (!conf || !conf.name || !conf.method) {
            //记录错误
            console.error('[core.oop.create]:创建类出错，缺少参数！');
            return null;
        }
        var method = conf.method,
            Parent = conf.parent,
            proto,
            init = TYPE.isFn(conf.init) ? conf.init : function () {
            };
        /**
         *
         * @param {Object} kConf
         */
        function Klass(kConf) {
            var that = this,
                parents,
                i,
                parent;
            if (!(that instanceof Klass)) {//可以让构造函数不使用new 关键字
                return new Klass(kConf);
            }
            that._conf = that._conf || {};
            parents = that.getClassChain();
            //超级类，从源头开始执行初始化方法
            i = parents.length - 1;
            for (i; i >= 0; i--) {
                parent = parents[i];
                if (TYPE.isFn(parent) && parent.prototype.__init &&
                        parent.prototype.hasOwnProperty('__init')) {
                    parent.prototype.__init.call(that, kConf);
                }
            }
        }
        if (!Parent || !TYPE.isFn(Parent)) {
            Parent = Atom;
        }
        Blank.prototype = Parent.prototype;
        //标识该类以Atom为基类
        Blank.prototype.__basedAtom = true;
        //
        Klass.prototype = new Blank();
        Klass.prototype.__init = init;
        Klass.prototype.__classChain =
            [Klass].concat(Parent.prototype.__classChain);
        Klass.prototype.__classNames =
            [conf.name].concat(Parent.prototype.__classNames);
        Klass.prototype.counstructor = Klass;
        //
        proto = Klass.prototype;
        FOR_OWN(method, function (val, key) {
            if (TYPE.isFn(val)) {
                //基类的getClassChain, getClassNames, __init方法不可被子类复写
                if (key === 'getClassChain' || key === 'getClassNames' ||
                        key === '__init') {
                    console.error('[core.oop.create] method [ ' + key +
                            ' ] can not be set!');
                } else {
                    proto[key] = val;
                }
            }
        });
        return Klass;
    };
});
