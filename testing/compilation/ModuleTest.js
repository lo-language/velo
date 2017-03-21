/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Module = require('../../constructs/Module');
const Lo = require('../../constructs');


module.exports["compilation"] = {

    "adds exports to definitions": function (test) {

        var root = new Module([
            new Lo.constant("PI", new Lo.literal("number", "3.14159")),
            new Lo.constant("E", new Lo.literal("number", "2.71828"))
        ]);

        // compiling the module discovers deps
        var js = root.compile();

        test.equal(js.renderJs(), "const $PI = 3.14159;\nconst $E = 2.71828;\nreturn {\'$E\': 2.71828,\'$PI\': 3.14159};\n");

        test.done();
    }
};
