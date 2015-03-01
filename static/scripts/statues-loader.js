/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(function () {
    'use strict';

    var request = new XMLHttpRequest(), load;

    load = function () {
        request.open('get', 'http://honfs.wtf/statues/', true);
        request.send();
    };

    return Object.create(null, {
        onLoad: {set: function (x) {
            request.onload = function () {
                x(JSON.parse(this.response));
            };
        }},
        load: {value: load}
    });
});
