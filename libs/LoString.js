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


class LoString extends LibModule {

    constructor () {
        super('String', 'Lo');
    }


    /**
     * @param sandbox
     */
    load (sandbox) {

        return {

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
        };
    }
}


module.exports = LoString;