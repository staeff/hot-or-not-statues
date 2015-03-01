/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define([
    './results', './vote-count-loader', './vote-poster'
], function (results, voteCountLoader, votePoster) {
    'use strict';

    var onVote, check, disable, buttonEl, onClick, uncheck, uncheckButton, o,
        disableButton, enableButton, enable, statue, onVoteCountLoad,
        voteCount, formattedVoteCount, incrementVoteCount,
        correctVoteCountIsLoaded;

    buttonEl = function (type) {
        return document.querySelector('.vote .' + type + '.button');
    };

    correctVoteCountIsLoaded = function () {
        return voteCount && voteCount.id - statue.ID === 0;
    };

    disableButton = function (type) {
        buttonEl(type).classList.add('disabled');
    };

    check = function (type) {
        buttonEl(type).classList.add('checked');
    };

    formattedVoteCount = function (type) {
        if (!correctVoteCountIsLoaded()) {
            return '?%'; // no data available
        }
        return Math.round(100 * voteCount[type] /
                          (voteCount.hot + voteCount.not)) + '%';
    };

    incrementVoteCount = function (type) {
        if (correctVoteCountIsLoaded()) {
            votePoster.post(statue, type);
            voteCount[type] += 1;
        }
    };

    onVote = function (type) {
        results.show();
        disable();
        incrementVoteCount(type);

        ['not', 'hot'].forEach(function (type) {
            check(type);
            buttonEl(type).textContent = formattedVoteCount(type);
        });
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

    onVoteCountLoad = function (x) {
        voteCount = x;
    };

    ['not', 'hot'].forEach(function (type) {
        document.querySelector('.vote .' + type + '.button').onclick =
            function () {
                onClick(type);
            };
    });

    voteCountLoader.onLoad = onVoteCountLoad;

    o = Object.create(null, {
        uncheck: {value: uncheck},
        disable: {value: disable},
        enable: {value: enable},
        statue: {set: function (x) {
            statue = x;
            voteCountLoader.load(statue);
        }}
    });

    results.voteButtons = o;

    return o;
});
