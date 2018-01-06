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

        var module = new LoModule('test');

        module.parse('using modA;\nusing modB;\nfoo is 42;\n');

        test.deepEqual(module.getDeps().map(dep => dep.name), [ 'modA', 'modB' ]);
        test.done();
    }
};