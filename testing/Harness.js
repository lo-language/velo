/**
 * Test harness for loading in Exa programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

var Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var __ = function (loader, program) {

    this.loader = loader;
    this.program = program;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.setUp = function (cb) {

    var self = this;

    this.loader.getModule(this.program).then(
        function (module) {
            self.module = module;
            cb();
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the JSConstruct for this program.
 *
 * @param cb
 * @return {String|*}
 */
__.prototype.getJs = function (cb) {

    return this.module.compile();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.testSuccess = function (test, input, expected) {

    var module = this.module;

    Q().then(function () {
        return module.run(input);
    }).then(
        function (result) {

            if (expected !== undefined) {
                test.equal(result, expected);
            }

            test.done();
        },
        function (err) {
            console.error("oh noes!");
        }
    ).done();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.testFailure = function (test, input, expected) {

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