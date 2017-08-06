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

        $setRawMode: function (args, succ, fail) {

            process.stdin.setRawMode(task.args[0]);
            succ();
        },

        $listen: function (args, succ, fail) {

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
        }
    },

    $out: {

        $write: function (args, succ, fail) {

            process.stdout.write.apply(process.stdout, args);
            succ();
        },

        $writeln: function (args, succ, fail) {

            process.stdout.write(args + '\n');
            succ();
        }
    },

    $err: {

        $write: function (args, succ, fail) {

            process.stderr.write.apply(process.stderr, args);
            succ();
        },

        $writeln: function (args, succ, fail) {

            process.stderr.write(args + '\n');
            succ();
        }
    }
};