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
    return function (form, asObj) {
        var parts = [],
            field,
            i,
            len,
            j,
            optLen,
            option,
            optValue;
        if (asObj === true) {
            parts = {};
        }
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];
            switch (field.type) {
            case 'select-one':
            case 'select-multiple':
                for (j = 0, optLen = field.options.length; j < optLen; j++) {
                    option = field.options[j];
                    if (option.selected) {
                        optValue = '';
                        if (option.hasAttribute) {
                            optValue = (option.hasAttribute('value') ?
                                    option.value : option.text);
                        } else {
                            optValue = (option.attributes.value.specified ?
                                    option.value : option.text);
                        }
                        if (asObj === true) {
                            parts[field.name] = optValue;
                        } else {
                            parts.push(encodeURIComponent(field.name) + '=' +
                                    encodeURIComponent(optValue));
                        }
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
                if (!field.checked) {
                    break;
                }
            default:
                if (asObj === true) {
                    parts[field.name] = field.value;
                } else {
                    parts.push(encodeURIComponent(field.name) + '=' +
                            encodeURIComponent(field.value));
                }
            }
        }
        return parts.join('&');
    };
});
