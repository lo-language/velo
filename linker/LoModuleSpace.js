/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const Task = require('../runtime/Task');
const http = require('http');

/**
 * The Lo standard library
 *
 * Created by spurcell on 8/19/17.
 */

var __ = function () {

};


/**
 * Registers the given module ID as a dependency.
 */
__.prototype.register = function (id) {

    // no-op; could optionally do some validation here
};


/**
 *
 */
__.prototype.getModules = function () {

    // todo - have a factory to create these wrapped methods

    return {

        String: {

            // params: string, delimiter
            // returns: array

            split: function (args, succ, fail) {

                // we want to return an array of one element, which is an array of strings
                succ([String(args[0]).split("\n")]);
            }
        },

        HTTP: {

            // params: string, delimiter
            // returns: array

            createServer: function (args, succ, fail) {

                var task = new Task(succ, fail);

                var server = new http.Server();

                server.listen(args[0]);

                var result = {

                    onRequest: function (args, succ, fail) {

                        // here's a fun abuse
                        server.on('request', function (req, res) {

                            var newReq = {

                                method: req.method,

                                url: req.url,

                                respond: function (args, succ, fail) {

                                    res.writeHead(args[0]);
                                    res.end(args[1]);
                                }
                            };

                            succ([newReq]);
                        });
                    }
                };

                task.succ([result]);
            }
        }
    };
};


module.exports = __;

