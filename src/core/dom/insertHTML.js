/**
 *
 * @author FuDeisgn2008@163.com
 * @date 2011-8-4
 */


define(function (require) {
    var ELEMENT = require('./element'),
        FIRST = require('./first'),
        LAST = require('./last'),
        PREV = require('./prev'),
        NEXT = require('./next'),
        console = require('../debug/console');
    /**
     * @param {HTMLElement}   el
     * @param {String}  html
     * @param {String}  where
     * @return {HTMLElement}
     */
    return function (el, html, where) {
        var range,
            frag;
        el = ELEMENT(el) || document.body;
        where = String(where).toLowerCase();
        if (el.insertAdjacentHTML) {
            switch (where) {
            case 'beforebegin':
                el.insertAdjacentHTML('BeforeBegin', html);
                return PREV(el);
            case 'afterbegin':
                el.insertAdjacentHTML('AfterBegin', html);
                return FIRST(el);
            case 'beforeend':
                el.insertAdjacentHTML('BeforeEnd', html);
                return LAST(el);
            case 'afterend':
                el.insertAdjacentHTML('AfterEnd', html);
                return NEXT(el);
            }
        } else {
            range = el.ownerDocument.createRange();
            switch (where) {
            case 'beforebegin':
                range.setStartBefore(el);
                frag = range.createContextualFragment(html);
                el.parentNode.insertBefore(frag, el);
                return PREV(el);
            case 'afterbegin':
                if (el.firstChild) {
                    range.setStartBefore(el.firstChild);
                    frag = range.createContextualFragment(html);
                    el.insertBefore(frag, el.firstChild);
                } else {
                    el.innerHTML = html;
                }
                return FIRST(el);
            case 'beforeend':
                if (el.lastChild) {
                    range.setStartAfter(el.lastChild);
                    frag = range.createContextualFragment(html);
                    el.appendChild(frag);
                } else {
                    el.innerHTML = html;
                }
                return LAST(el);
            case 'afterend':
                range.setStartAfter(el);
                frag = range.createContextualFragment(html);
                el.parentNode.insertBefore(frag, el.nextSibling);
                return NEXT(el);
            }
        }
        //
        console.error('[core/dom/insertHTML] Illegal param -> where: where="' +
                where + '"');
    };
});
