
define(function () {

    var scrollBarWidth = 0;

    return {

        getWidth: function () {
            if (!scrollBarWidth) {
                var inner = document.createElement('p'),
                    outer = document.createElement('div'),
                    w1,
                    w2;

                inner.style.width = '100%';
                inner.style.height = '200px';

                outer.style.position = 'absolute';
                outer.style.top = '0px';
                outer.style.left = '0px';
                outer.style.visibility = 'hidden';
                outer.style.width = '200px';
                outer.style.height = '150px';
                outer.style.overflow = 'hidden';
                outer.appendChild (inner);

                document.body.appendChild (outer);

                w1 = inner.offsetWidth;
                outer.style.overflow = 'scroll';
                w2 = inner.offsetWidth;
                if (w1 === w2) {
                    w2 = outer.clientWidth;
                }

                document.body.removeChild (outer);

                scrollBarWidth = w1 - w2;
            }

            return scrollBarWidth;
        },

        hasVertical: function (el) {
            return el && el.scrollHeight > el.clientHeight;
        },

        hasHorizontal: function () {
            return el && el.scrollWidth > el.clientWidth;
        }

    };



});

