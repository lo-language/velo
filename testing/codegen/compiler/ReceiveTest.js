/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["receive"] = {

    "generates js statements": function (test) {

        var node = {
            type: 'receive',
            names: ['foo', 'mani', 'padme', 'hum']
        };

        test.equal(Compiler.compile(node).render(), 'var $foo = args.shift(),\n$mani = args.shift(),\n$padme = args.shift(),\n$hum = args.shift();\n\n');
        test.done();
    }
};
