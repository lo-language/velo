/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["basics"] = {

    "local module": function (test) {

        var node = {
            type: 'modref',
            val: 'Shape'
        };

        var scope = new Scope();
        var res = scope.compile(node);

        test.equal(res.render(), 'MODS["Shape"]');
        test.deepEqual(scope.getDeps(), ['Shape']);
        test.done();
    }
};
