/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['statues-loader', 'p'], function (statuesLoader, p) {
    'use strict';

    var replaceWithNext, updateImageUrl, currentIndex,
        imageEl = document.querySelector('.image-container img.statue'),
        loaderEl = document.querySelector('.image-container .loader'),
        hideLoader, showLoader, onStatueLoad, statues, pCounter = 10;

    hideLoader = function () {
        loaderEl.classList.add('hidden');
    };

    showLoader = function () {
        loaderEl.classList.remove('hidden');
    };

    replaceWithNext = function () {
        var newIndex;

        do {
            newIndex = Math.floor(statues.length * Math.random());
        } while (newIndex === currentIndex);

        showLoader();
        currentIndex = newIndex;
        updateImageUrl();
    };

    updateImageUrl = function () {
        var statue = statues[currentIndex];

        if (pCounter === 0) {
            statue = p.statue;
        }
        pCounter -= 1;

        imageEl.onerror = replaceWithNext;
        imageEl.onload = function () {
            hideLoader();
            onStatueLoad(statue);
        };
        imageEl.setAttribute('src', '/images/statues/' + statue.ID + '.jpg');
    };

    statuesLoader.onLoad = function (response) {
        statues = response.statues;
        replaceWithNext();
    };

    statuesLoader.load();

    return Object.create(null, {
        replaceWithNext: {value: replaceWithNext},
        onStatueLoad: {set: function (x) {
            onStatueLoad = x;
        }}
    });
});
