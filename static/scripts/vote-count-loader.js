/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(function () {
    'use strict';

    var load, request = new XMLHttpRequest();

    load = function (statue) {
        request.open('get', 'http://honfs.wtf/statues/' + statue.ID, true);
        request.send();
    };

    return Object.create(null, {
        load: {value: load},
        onLoad: {set: function (x) {
            request.onload = function () {
                x(JSON.parse(this.response));
            };
        }}
    });
});
