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

module.exports['parse errors'] = {

    "message syntax": function (test) {

        test.expect(1);

        var program = new Program(new LoModule('main').setSource(
            'main is () {\n' +
            '    sayHello <-;\n};\n'));

        program.on('ERROR', err => {

            test.equal(err, 'invalid syntax at line 2 col 16:\n\n      sayHello <-;' +
                '\n                 ^\nUnexpected semi token: ";"\n');
        });

        program.compile().catch(() => {
            test.done();
        });
    }
};

module.exports['compile errors'] = {

    "unbound id": function (test) {

        test.expect(3);

        var program = new Program(new LoModule('main').parse(
            'main is () {\n' +
            '    sayHello;\n};\n'
        ));

        program.on('ERROR', (node, error) => {
            test.deepEqual(node.sourceLoc, [2, 5]);
            test.equal(error, 'identifier "sayHello" used but not bound in this context');
        });

        program.compile().catch(
            function (err) {
                test.equal(err.message, 'compilation failed');
                test.done();
            }
        );
    }
};