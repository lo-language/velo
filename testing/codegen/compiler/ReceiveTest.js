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

        var scope = new Scope();

        test.equal(scope.has("foo"), false);
        test.equal(scope.has("mani"), false);
        test.equal(scope.compile(node).render(), '');

        // params should now be declared in the scope
        test.equal(scope.has("foo"), true);
        test.equal(scope.has("mani"), true);

        test.deepEqual(scope.receives, ['foo', 'mani', 'padme', 'hum'])

        test.done();
    }
};
