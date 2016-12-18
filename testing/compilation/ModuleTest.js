/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Module = require('../../constructs/Module');
const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const util = require('util');
var Q = require('q');

module.exports["load deps"] = {

    "no nested": function (test) {

        var root = new Module([
            {id: 'Common', ref: 'common'}
        ]);

        var mockProgram = {

            loadModule: function (modRef) {

                test.equal(modRef, 'common');
                return Q();
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