// just a stub

"use strict";

var http = require('http');

module.exports = {

    stdout: {
        write: function (recur, args) {

            process.stdout.write.apply(process.stdout, args);

            // we expect to be called with a Request bound to this;
            // we need to reply so the caller doesn't hang waiting for a response
            this.reply();
        }
    },

    http: {

        get: function (recur, args) {

            var exaRequest = this;

            http.get(args[0], function (res) {

                //                console.log("Got response: " + res.statusCode);

                var body = '';

                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    body += chunk;
                });
                res.on('end', function () {
                    exaRequest.reply([res, body]);
                });
            });
        }
    }
};