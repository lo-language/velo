"use strict";

const Task = require('./Task');

// any provided ports should be stuffed into this

module.exports = {

    in: {

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
    },

    out: {

        write: function (task) {

            process.stdout.write.apply(process.stdout, task.args);
            task.respond("reply");
        }
    },

    err: {

        write: function (task) {

            process.stderr.write.apply(process.stderr, task.args);
            task.respond("reply");
        }
    }
};