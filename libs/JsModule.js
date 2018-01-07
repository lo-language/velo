/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Wraps JS functionality in a Lo module.
 *
 * Created by seth on 1/6/18.
 */

"use strict";

const LibModule = require('./LibModule');

class JsModule extends LibModule {

    constructor (name) {

        super(name, 'JS');
    }

    /**
     * no-op
     */
    acquire () {

        return Promise.resolve(this);
    }

    getDeps () {

        return [];
    }

    /**
     * @param sandbox
     */
    load (sandbox) {

        return {

            E: Math.E,

            PI: Math.PI,

            sin: function (args, succ, fail) {
                succ([Math.sin(args[0])]);
            },

            cos: function (args, succ, fail) {
                succ([Math.cos(args[0])]);
            },

            random: function (args, succ, fail) {
                fail(["naughty!"]);
            }
        };
    }
}

module.exports = JsModule;