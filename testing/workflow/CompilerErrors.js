/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 8/12/17.
 */

"use strict";

const Program = require('../../Program');
const LoModule = require('../../LoModule');

module.exports['undefined identifier'] = {

    "success": function (test) {

        test.expect(2);

        var program = new Program(new LoModule('main').parse(
            'main is () {\n' +
            '    sayHello <-;\n};\n'
        ));

        program.on('ERROR', (node, error) => {
            test.deepEqual(node.sourceLoc, [2, 5]);
            test.equal(error, 'identifier "sayHello" used but not bound in this context');
        });

        program.compile().then(
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