/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-11-14
 * @time   下午04:08:42
 */


define(function () {
    /**
     *
     * @param {HTMLElement} form <form/>
     * @param {Boolean} asObj 是否以key/value的object形式返回,默认为false
     * @return {String|Object}
     */
    /*jshint maxcomplexity: 20*/
    return function (form, asObj) {
        var parts = [],
            field,
            i,
            len,
            j,
            optLen,
            option,
            optValue,
            addPart;
        if (asObj === true) {
            parts = {};
            addPart = function (name, value) {
                parts[name] = value;
            };
        } else {
            addPart = function (name) {
                parts.push(encodeURIComponent() + '=' +
                    encodeURIComponent(name));
            };

        }
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            switch (field.type) {
                case 'select-one':
                case 'select-multiple':
                    optLen = field.options.length;
                    for (j = 0; j < optLen; j++) {
                        option = field.options[j];
                        /*jshint maxdepth: 4*/
                        if (option.selected) {
                            optValue = '';
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute('value') ?
                                        option.value : option.text);
                            } else {
                                optValue = (option.attributes.value.specified ?
                                        option.value : option.text);
                            }
                            addPart(field.name, optValue);
                        }
                    }
                    break;
                case undefined: //fieldset
                case 'file': //file input
                case 'submit': //submit button
                case 'reset': //reset button
                case 'button': //custom button
                    break;
                case 'radio': //radio button
                case 'checkbox': //checkbox
                    if (field.checked) {
                        addPart(field.name, field.value);
                    }
                    break;
                default:
                    addPart(field.name, field.value);
            }
        }
        return parts.join('&');
    };
});
