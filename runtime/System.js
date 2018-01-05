/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const Task = require('./Task');
const net = require('net');

// any provided ports should be stuffed into this

module.exports = {

    in: {

        isTTY: process.stdin.isTTY,

        setRawMode: function (args, succ, fail) {

            process.stdin.setRawMode(task.args[0]);
            succ();
        },

        listen: function (args, succ, fail) {

            var service = args[0];

            process.stdin.setRawMode(true);

            process.stdin.on('data', function (chunk) {

                if (chunk[0] == 3) {
                    process.exit();
                }
                else {
                    //console.log(chunk);
                    Task.sendRootRequest(service, [chunk], function () {}, function () {});
                }
            });

            succ();
        },

        read: function (args, succ, fail) {

            var task = new Task(succ, fail);

            // process.stdin.setEncoding('utf8');

            var handler = () => {

                process.stdin.removeListener('readable', handler);

                const chunk = process.stdin.read();

                if (chunk !== null) {
                    task.succ([chunk]);
                }
                else {
                    task.fail();
                }
            };

            process.stdin.on('readable', handler);
        }
    },

    out: {

        write: function (args, succ, fail) {

            process.stdout.write.apply(process.stdout, args);
            succ();
        },

        writeln: function (args, succ, fail) {

            process.stdout.write(args + '\n');
            succ();
        }
    },

    err: {

        write: function (args, succ, fail) {

            process.stderr.write.apply(process.stderr, args);
            succ();
        },

        writeln: function (args, succ, fail) {

            process.stderr.write(args + '\n');
            succ();
        }
    },

    listen: function (args, succ, fail) {


        var task = new Task(succ, fail);
        var server = new net.Server();

        var handler;

        server.on('error', handler = function (err) {

            task.fail([err.message]);
        });

        server.listen(args[0], function () {

            server.removeListener('error', handler);

            succ([server]);
        });
    },

    // support installation of signal handlers
    // todo -- should this be the facility that can handle halt-on-error?

    on: function (args, succ, fail) {

        // just call success on signal? multiple times?

        succ();
    }
};