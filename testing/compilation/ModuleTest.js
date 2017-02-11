/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Module = require('../../constructs/Module');
const Lo = require('../../constructs');
var Q = require('q');

module.exports["load deps"] = {

    "no nested": function (test) {

        var root = new Module([], [
            new Lo.constant("PI", new Lo.identifier("Pi", "Math"))
        ]);

        // compiling the module discovers deps
        var js = root.compile();
        var mockModule = {};

        var mockProgram = {

            loadModule: function (modRef) {

                test.equal(modRef, 'Math');
                return Q(mockModule);
            }
        };

        root.loadDeps(mockProgram).then(
            function () {

                test.done();
            }
        ).done();
    },

    "nested deps": function (test) {

        // todo
        test.done();
    },

    "with cycles": function (test) {

        // todo
        test.done();
    }
};