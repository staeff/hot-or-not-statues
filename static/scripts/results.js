/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(['results'], function (results) {
    'use strict';

    var show;

    show = function () {
        document.querySelector('.results').classList.remove('hidden');
    };

    return {
        show: show
    };
});
