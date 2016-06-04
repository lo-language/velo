/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

// just a stub

"use strict";

const Task = require('./Task');

module.exports = {

    clock: {

        trigger: function (task) {

            var service = task.args[0];
            var delay = task.args[1];
            var interval = task.args[2];

            // creates a root task

            if (interval == 0) {
                setTimeout(function () {
                    Task.sendRootRequest(service, [], function () {}, function () {})
                }, delay);
            }
            else {
                setInterval(function () {
                    Task.sendRootRequest(service, [], function () {}, function () {})
                }, interval);
            }

            task.respond("reply");
        }
    },

    keyboard: {

        listen: function (task) {

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
    }
};