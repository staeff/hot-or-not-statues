/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['./results'], function (results) {
    'use strict';

    var onVote, check, disable, buttonEl, onClick, uncheck, uncheckButton, o,
        disableButton, enableButton, enable;

    buttonEl = function (type) {
        return document.querySelector('.vote .' + type + '.button');
    };

    disableButton = function (type) {
        buttonEl(type).classList.add('disabled');
    };

    check = function (type) {
        buttonEl(type).classList.add('checked');
    };

    onVote = function (type) {
        check(type);
        results.show();
        disable();
        buttonEl(type).textContent = '\u2713';
    };

    onClick = function (type) {
        if (!buttonEl(type).classList.contains('disabled')) {
            onVote(type);
        }
    };

    uncheckButton = function (type) {
        buttonEl(type).classList.remove('checked');
    };

    uncheck = function () {
        ['not', 'hot'].forEach(function (type) {
            uncheckButton(type);
        });
    };

    disable = function () {
        ['not', 'hot'].forEach(function (type) {
            disableButton(type);
        });
    };

    enableButton = function (type) {
        buttonEl(type).classList.remove('disabled');
    };

    enable = function () {
        ['not', 'hot'].forEach(function (type) {
            enableButton(type);
        });
    };

    ['not', 'hot'].forEach(function (type) {
        document.querySelector('.vote .' + type + '.button').onclick =
            function () {
                onClick(type);
            };
    });

    o = {
        uncheck: uncheck,
        disable: disable,
        enable: enable
    };

    results.voteButtons = o;

    return o;
});
