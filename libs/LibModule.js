/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 1/6/18.
 */

"use strict";

const LoModule = require('../LoModule');

class LibModule extends LoModule {

    constructor (name, ns) {

        super(name, ns);
    }

    /**
     * no-op
     */
    acquire () {

        return Promise.resolve(this);
    }

    /**
     * no-op
     */
    getDeps () {

        return [];
    }

    /**
     * no-op
     */
    compile () {

    }

    /**
     * @param sandbox
     */
    load (sandbox) {

        return libs[this.name];
    }
}

const libs = {

    'String': {

        /**
         * params: string, delimiter
         * returns: array
         */

        split: function (args, succ, fail) {

            // we want to return an array of one element, which is an array of strings
            succ([String(args[0]).split("\n")]);
        },

        /**
         * params: string
         * returns: int
         */

        toInt: function (args, succ, fail) {

            // we want to return an array of one element, which is an array of strings
            succ([parseInt(args[0])]);
        }
    },

    'HTTP' : {

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


module.exports = LibModule;