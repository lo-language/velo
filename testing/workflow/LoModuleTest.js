/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 1/2/18.
 */

"use strict";

const LoModule = require('../../LoModule');
const Program = require('../../Program');

module.exports["get deps"] = {

    "success": function (test) {

        var program = new Program();

        program.sourceDir = __dirname + '/';

        program.acquire({name: 'main.lo', ref: '__local::main.lo'}).then(module => {

            // test.deepEqual(module.parse().getDeps().map(dep => dep.toString()), [
            //     { ns: '__local', name: 'modA' },
            //     { ns: '__local', name: 'modB' } ]);
            test.done();
        });
    }
};