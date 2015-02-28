/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['results'], function (results) {
    'use strict';

    var onVote, check, disable, buttonEl, onClick;

    buttonEl = function (type) {
        return document.querySelector('.vote .' + type + '.button');
    };

    disable = function (type) {
        buttonEl(type).classList.add('disabled');
    };

    check = function (type) {
        buttonEl(type).classList.add('checked');
    };

    onVote = function (type) {
        check(type);
        results.show();
        disable('hot');
        disable('not');
    };

    onClick = function (type) {
        if (!buttonEl(type).classList.contains('disabled')) {
            onVote(type);
        }
    };

    document.querySelector('.vote .not.button').onclick = function () {
        onClick('not');
    };

    document.querySelector('.vote .hot.button').onclick = function () {
        onClick('hot');
    };
});
