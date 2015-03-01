/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['statues'], function (statues) {
    'use strict';

    var replaceWithNext, updateImageUrl, currentIndex,
        imageEl = document.querySelector('.image-container img.statue'),
        loaderEl = document.querySelector('.image-container .loader'),
        hideLoader, showLoader, onStatueLoad;

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
        imageEl.onerror = replaceWithNext;
        imageEl.onload = function () {
            hideLoader();
            onStatueLoad(statue);
        };
        imageEl.setAttribute('src', statues[currentIndex].IMAGEN);
    };

    replaceWithNext();

    return Object.create(null, {
        replaceWithNext: {value: replaceWithNext},
        onStatueLoad: {set: function (x) {
            onStatueLoad = x;
        }}
    });
});
