/**
 * Test harness for loading in Exa programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

var ExaModule = require('../loader/ExaModule');
var Q = require('q');

var __ = function (dir, program) {

    this.file = dir + '/' + program + '.exa';
};

__.prototype.load = function (cb) {

    var self = this;

    ExaModule.createFromFile(this.file).then(
        function (module) {
            self.module = module;
            cb();
        }
    );
};

__.prototype.getJs = function (cb) {

    return this.module.compile();
};

__.prototype.success = function (test, input, expected) {

    var module = this.module;

    Q().then(function () {
        return module.run(input);
    }).then(
        function (result) {

//            console.log(result.toString());

            if (expected !== undefined) {
                test.equal(result, expected);
            }

            test.done();
        }
    ).done();
};

__.prototype.failure = function (test, input, expected) {

    this.module.run(input).then(
        function () {
            test.fail();
        },
        function (err) {
            test.equal(err, expected);
            test.done();
        }
    );
};

module.exports = __;