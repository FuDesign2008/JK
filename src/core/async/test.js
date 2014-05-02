var logMsg = function (msg) {
    console.log(msg + "");
};



function Deferred() {
    if (this instanceof Deferred) {
        this._init();
    } else {
        return new Deferred();
    }
}

Deferred.prototype = {
    _init: function () {
        this._queue = [];
    },
    resolve: function () {
        var that = this;
        var fn, queue = that._queue;
        while (queue.length) {
            fn = queue.shift();
            try {
                fn();
            } catch (ex) {
                // do nothing
            }
        }
        that._queue = null;
        return that;
    },
    then: function (fn) {
        var that = this;
        if (that._queue) {
            that._queue.push(fn);
        } else {
            try {
                fn();
            } catch (ex) {
                // do nothing
            }
        }
        return that;
    }
};

var sayHellLater = function () {
    var dfd = Deferred();
    window.setTimeout(function () {
        dfd.resolve();
    }, 1000);
    return dfd;
};

var sayHelloDfd = sayHellLater().then(function () {
    logMsg("This is then 1");
}).then(function () {
    logMsg("This is then 2");
}).then(function () {
    logMsg("This is then 3");
}).then(function () {
    logMsg("This is then 4");
});


window.setTimeout(function () {
    sayHelloDfd.then(function () {
        logMsg("this is 5000 ms later");
    });
}, 5000);










