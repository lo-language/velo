/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const LibModule = require('./LibModule');


class LoHttp extends LibModule {

    constructor () {
        super('String', 'Lo');
    }


    /**
     * @param sandbox
     */
    load (sandbox) {

        return {

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
        };
    }
}


module.exports = LoHttp;