// just a stub

"use strict";

var http = require('http');

module.exports = {

    stdout: {

        write: function (task) {

            process.stdout.write.apply(process.stdout, task.args);

            // we expect to be called with a Request bound to this;
            // we need to reply so the caller doesn't hang waiting for a response
            task.reply();
        }
    },

    http: {

        get: function (task) {

            http.get(task.args[0], function (res) {

                var body = '';

                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                    body += chunk;
                });

                res.on('end', function () {
                    task.reply([res, body]);
                });
            });
        }
    }
};