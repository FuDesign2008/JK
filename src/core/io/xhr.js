/**
 * 创建XMLHttpRequest
 * @author FuDesign2008@163.com
 * @date   2011-10-10
 * @time   下午09:30:19
 * @see  https://developer.mozilla.org/en/XMLHttpRequest
 */
// W3C的 XMLHttpRequest 的定义： http://www.w3.org/TR/XMLHttpRequest/
//[NoInterfaceObject]
//interface XMLHttpRequestEventTarget : EventTarget {
// for future use
//};
//[Constructor]
//interface XMLHttpRequest : XMLHttpRequestEventTarget {
// event handler attributes
//attribute Function onreadystatechange;
// states
// const unsigned short UNSENT = 0;
//const unsigned short OPENED = 1;
//const unsigned short HEADERS_RECEIVED = 2;
//const unsigned short LOADING = 3;
// const unsigned short DONE = 4;
// readonly attribute unsigned short readyState;
// request
//void open(DOMString method, DOMString url);
//void open(DOMString method, DOMString url, boolean async);
//void open(DOMString method, DOMString url, boolean async, DOMString? user);
//void open(DOMString method, DOMString url, boolean async,
//  DOMString? user, DOMString? password);
//void setRequestHeader(DOMString header, DOMString value);
//void send();
//void send(Document data);
//void send([AllowAny] DOMString? data);
//void abort();
// response
//readonly attribute unsigned short status;
//readonly attribute DOMString statusText;
//DOMString getResponseHeader(DOMString header);
//DOMString getAllResponseHeaders();
//readonly attribute DOMString responseText;
//readonly attribute Document responseXML;
//};




define(function () {
    var fn = null,
        fns = [function () {
            return new window.ActiveXObject('Microsoft.XMLHTTP');
        }, function () {
            return new window.ActiveXObject('Msxml2.XMLHTTP');
        }, function () {
            return new XMLHttpRequest();
        }];
    /**
     *
     * @return {XMLHttpRequest}
     */
    return function () {
        var index,
            xhr;
        if (!fn) {
            index = fns.length - 1;
            for (index; index >= 0; index--) {
                try {
                    xhr = fns[index]();
                    fn = fns[index];
                    fns = null;
                    return xhr;
                } catch (ex) {
                    // do nothing;
                }
            }
        }
        return fn();
    };
});
