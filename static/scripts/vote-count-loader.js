/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(function () {
    'use strict';

    var load, onLoad, request = new XMLHttpRequest();

    load = function (statue) {
        console.log('loading statue ' + statue.ID + '…');
        onLoad({
            id: 332,
            hot: 0,
            not: 0
        });
    };

    return Object.create(null, {
        load: {value: load},
        onLoad: {set: function (x) {
            onLoad = x;
        }}
    });
});
