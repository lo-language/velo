/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const Task = require('./Task');

// any provided ports should be stuffed into this

module.exports = {

    $in: {

        $isTTY: process.stdin.isTTY,

        $setRawMode: function (task) {

            process.stdin.setRawMode(task.args[0]);
            task.respond("reply");
        },

        $listen: function (task) {

            var service = task.args[0];

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

            task.respond("reply");
        }
    },

    $out: {

        $write: function (task) {

            process.stdout.write.apply(process.stdout, task.args);
            task.respond("reply");
        },

        $writeln: function (task) {

            process.stdout.write(task.args + '\n');
            task.respond("reply");
        }
    },

    $err: {

        $write: function (task) {

            process.stderr.write.apply(process.stderr, task.args);
            task.respond("reply");
        },

        $writeln: function (task) {

            process.stderr.write(task.args + '\n');
            task.respond("reply");
        }
    }
};