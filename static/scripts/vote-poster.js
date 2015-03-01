/*jslint browser: true, maxerr: 50, maxlen: 80 */

/*global define */

define(function () {
    'use strict';

    var post, request = new XMLHttpRequest();

    post = function (statue, type) {
        request.open('post', 'http://honfs.wtf/statues/' + statue.ID, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify({
            'vote': type
        }));
    };

    return Object.create(null, {
        post: {value: post}
    });
});
