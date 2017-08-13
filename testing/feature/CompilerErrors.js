/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 8/12/17.
 */

"use strict";

const Program = require('../../linker/LoadAndGo');
const MockModuleSpace = require('../MockModuleSpace');


module.exports['undefined identifier'] = {

    "success": function (test) {

        // test.expect(1);

        var modSpace = new MockModuleSpace(
            'main is {\n' +
            '    sayHello();\n};\n');

        var errorListener = function (line, error) {
            test.equal(line, 2);
            test.equal(error, 'reference to unbound identifier "sayHello"');
        };

        modSpace.resolve(null, errorListener).then(
            function () {
                test.ok(false);
                test.done();
            },
            function (err) {

                test.done();
            }
        );
    }
};