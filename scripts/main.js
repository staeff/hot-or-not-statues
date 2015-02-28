/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(function () {
    'use strict';

    alert('Hello world');

    document.querySelector('.not.button').onclick = function () {
        onClicked(false);
    }
});
