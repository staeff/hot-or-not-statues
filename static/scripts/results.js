/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['current-statue'], function (currentStatue) {
    'use strict';

    var show, hide, voteButtons;

    show = function () {
        document.querySelector('.results').classList.remove('hidden');
    };

    hide = function () {
        document.querySelector('.results').classList.add('hidden');
    };

    document.querySelector('.results .next.button').onclick = function () {
        currentStatue.onImageLoad = voteButtons.enable;
        currentStatue.replaceWithNext();
        voteButtons.uncheck();
        voteButtons.disable();
        hide();
    };

    return Object.create(null, {
        show: {value: show},
        voteButtons: {set: function (x) {
            voteButtons = x;
        }}
    });
});
