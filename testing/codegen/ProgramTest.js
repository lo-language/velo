/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

var Program = require('../../codegen/Program');
var Module = require('../../codegen/Module');
var Q = require('q');

module.exports["compilation"] = {

    "compile module": function (test) {

        var module = new Module("foo is 42;");

        var sourcer = {

            acquire: function (ref) {
                test.equal(ref, "Shape");
                return Q(module);
            }
        };

        var p = new Program(sourcer);

        p.compile("Shape").then(result => {

            test.equal(result, module);
            test.done();
        }).done();
    }
};


module.exports["rendering"] = {

    "render modules": function (test) {

        test.done();
    }
};