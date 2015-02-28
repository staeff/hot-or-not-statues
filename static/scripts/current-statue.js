/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['statues'], function (statues) {
    'use strict';

    var replaceWithNext, updateImageUrl, currentIndex,
        imageEl = document.querySelector('img.statue');

    replaceWithNext = function () {
        currentIndex = Math.floor(statues.length * Math.random());
        updateImageUrl();
    };

    updateImageUrl = function () {
        imageEl.setAttribute('src', statues[currentIndex]);
    };

    imageEl.onerror = replaceWithNext;
//    imageEl.onLoaded = ; // TODO: show previous image until next is loaded

    replaceWithNext();

    return {
        replaceWithNext: replaceWithNext
    };
});
