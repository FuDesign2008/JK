/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-10-14
 * @time   下午05:00:46
 */


define(function (require) {
    var UA = require('../bom/ua'),
        keyCodesCommon = {
            '8': 'BACKSPACE',
            '9': 'TAB',
            '13': 'ENTER',
            '16': 'SHIFT',
            '17': 'CTRL',
            '18': 'ALT',
            '19': 'PAUSE',
            '20': 'CAPS_LOCK',
            '27': 'ESC',
            '32': 'SPACE',
            '33': 'PAGE_UP',
            '34': 'PAGE_DOWN',
            '35': 'END',
            '36': 'HOME',
            '37': 'LEFT',
            '38': 'UP',
            '39': 'RIGHT',
            '40': 'DOWN',
            '44': 'PRINT_SCREEN',
            '45': 'INSERT',
            '46': 'DELETE',
            '48': 'ZERO',
            '49': 'ONE',
            '50': 'TWO',
            '51': 'THREE',
            '52': 'FOUR',
            '53': 'FIVE',
            '54': 'SIX',
            '55': 'SEVEN',
            '56': 'EIGHT',
            '57': 'NINE',
            '63': 'QUESTION_MARK',
            '65': 'A',
            '66': 'B',
            '67': 'C',
            '68': 'D',
            '69': 'E',
            '70': 'F',
            '71': 'G',
            '72': 'H',
            '73': 'I',
            '74': 'J',
            '75': 'K',
            '76': 'L',
            '77': 'M',
            '78': 'N',
            '79': 'O',
            '80': 'P',
            '81': 'Q',
            '82': 'R',
            '83': 'S',
            '84': 'T',
            '85': 'U',
            '86': 'V',
            '87': 'W',
            '88': 'X',
            '89': 'Y',
            '90': 'Z',
            '93': 'CONTEXT_MENU',
            '96': 'NUM_ZERO',
            '97': 'NUM_ONE',
            '98': 'NUM_TWO',
            '99': 'NUM_THREE',
            '100': 'NUM_FOUR',
            '101': 'NUM_FIVE',
            '102': 'NUM_SIX',
            '103': 'NUM_SEVEN',
            '104': 'NUM_EIGHT',
            '105': 'NUM_NINE',
            '106': 'NUM_MULTIPLY',
            '107': 'NUM_PLUS',
            '109': 'NUM_MINUS',
            '110': 'NUM_PERIOD',
            '111': 'NUM_DIVISION',
            '112': 'F1',
            '113': 'F2',
            '114': 'F3',
            '115': 'F4',
            '116': 'F5',
            '117': 'F6',
            '118': 'F7',
            '119': 'F8',
            '120': 'F9',
            '121': 'F10',
            '122': 'F11',
            '123': 'F12',
            '144': 'NUMLOCK',
            '186': 'SEMICOLON',
            '189': 'DASH',
            '187': 'EQUALS',
            '188': 'COMMA',
            '190': 'PERIOD',
            '191': 'SLASH',
            '192': 'APOSTROPHE',
            '222': 'SINGLE_QUOTE',
            '219': 'OPEN_SQUARE_BRACKET',
            '220': 'BACKSLASH',
            '221': 'CLOSE_SQUARE_BRACKET'
        },
        keyCodesMac = {
            '3': 'ENTER',
            '91': 'META',
            // Firefox (Gecko) fires this for the meta key instead of 91
            '224': 'META'
        },
        keyCodesWin = {
            '91': 'WIN_KEY_LEFT',
            '92': 'WIN_KEY_RIGHT',
            '224': 'WIN_KEY',
            '229': 'WIN_IME'
        },
        mouseButtons = {
            '1': 'MOUSE_LEFT',
            '2': 'MOUSE_MIDDLE',
            '3': 'MOUSE_RIGHT'
        };
    /**
     *
     * @param {Integer} which  [core/event/event]中的Event对象的which属性
     * @param {String} type    [core/event/event]中的Event对象的type属性
     * @return {String}
     */
    return function (which, type) {
        if (!type) {
            return null;
        }
        if (/key/i.test(type)) {
            return keyCodesCommon[which] || (UA.WIN && keyCodesWin[which]) ||
                (UA.MAC && keyCodesMac[which]) || null;
        }
        //mouse event
        return mouseButtons[which];
    };
});
