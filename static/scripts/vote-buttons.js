/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['./results'], function (results) {
    'use strict';

    var onVote, check, disable, buttonEl, onClick, reset, resetButton, o;

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

    resetButton = function (type) {
        buttonEl(type).classList.remove('checked');
        buttonEl(type).classList.remove('disabled');
    };

    reset = function () {
        ['not', 'hot'].forEach(function (type) {
            resetButton(type);
        });
    };

    ['not', 'hot'].forEach(function (type) {
        document.querySelector('.vote .' + type + '.button').onclick =
            function () {
                onClick(type);
            };
    });

    document.querySelector('.vote .hot.button').onclick = function () {
        onClick('hot');
    };

    o = {
        reset: reset
    };

    results.voteButtons = o;

    return o;
});
