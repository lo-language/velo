/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

const Task = require('../runtime/Task');
const http = require('http');

// todo some kind of CLI options parser?

module.exports = {

    /**
     *
     * param delay - ms until first message
     * param interval - ms between successive messages; zero for one hit
     */
    ':setTimer': function (task) {

        var delay = task.args[0];
        var interval = task.args[1];

        setTimeout(function () {

            task.respond("reply");

        }, delay);
    },

    /**
     * Returns a pseudo-random number. True random consumes a potentially-limited system resource (entropy) and must therefore be injected.
     */
    ':getRandom': function (task) {

        task.respond("reply", Math.random());
    },

    /**
     * Returns a pseudo-random number. True random consumes a potentially-limited system resource (entropy) and must therefore be injected.
     */
    ':acquire': function (task) {

        // todo
    },

    'net:http:client': function (task) {

        task.respond("reply", {

            get: function (task) {

                var cb = task.doAsync(function () {});

                http.get(task.args[0], function (res) {

                    var body = '';

                    res.setEncoding('utf8');

                    res.on('data', function (chunk) {
                        body += chunk;
                    });

                    res.on('end', function () {
                        cb();
                        task.respond("reply", [res, body]);
                    });
                });
            }
        });
    },

    'net:http:server': function (task) {

        var server = new http.Server();
        var service = task.args[1];

        server.on('request', function (req, res) {

            //console.log('JS REQ', req.url);
            //res.end("hi there", 'utf-8');

            var reqTask = new Task('HTTP_REQUEST', service, [req]);

            reqTask.on("reply", function (body) {
                res.end(body);
            });

            reqTask.on("fail", function (message) {
                res.statusCode = 500;
                res.end(message, 'utf-8');
            });

            service(reqTask);
        });

        server.listen(task.args[0], function () {

            task.respond("reply", server);
        });
    }
};