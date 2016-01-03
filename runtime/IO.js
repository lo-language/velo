// just a stub

"use strict";

module.exports = {

    stdout: {

        write: function (task) {

            process.stdout.write.apply(process.stdout, task.args);

            // we need to reply so the caller doesn't hang waiting for a response
            // todo - call this function as a dispatch?
            task.respond("reply");
        }
    },

    stderr: {

        write: function (task) {

            process.stderr.write.apply(process.stderr, task.args);

            // we need to reply so the caller doesn't hang waiting for a response
            // todo - call this function as a dispatch?
            task.respond("reply");
        }
    }
};