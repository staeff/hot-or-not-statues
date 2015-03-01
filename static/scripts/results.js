/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['current-statue'], function (currentStatue) {
    'use strict';

    var show, hide, voteButtons, onStatueLoad,
        resultsEl = document.querySelector('.results');

    show = function () {
        resultsEl.classList.remove('hidden');
    };

    hide = function () {
        resultsEl.classList.add('hidden');
    };

    onStatueLoad = function (statue) {
        document.querySelector('.results .title').textContent = statue.TITULO;
        document.querySelector('.results .location').textContent =
            statue.UBICACION;
        voteButtons.statue = statue;
        voteButtons.enable();
    };

    document.querySelector('.results .next.button').onclick = function () {
        currentStatue.replaceWithNext();
        voteButtons.uncheck();
        voteButtons.disable();
        hide();
    };

    currentStatue.onStatueLoad = onStatueLoad;

    return Object.create(null, {
        show: {value: show},
        voteButtons: {set: function (x) {
            voteButtons = x;
        }}
    });
});
