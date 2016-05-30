/**
 * Test harness for loading in Exa programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

const Runner = require('./Runner');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var __ = function (sourceDir, program) {

    this.builder = new Runner(sourceDir);
    this.program = program;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.run = function (input) {

    var d = Q.defer();

    var test = this.builder.build(this.program);

    Task.sendRootRequest(service, args, d.resolve.bind(d), d.reject.bind(d));

    return d.promise;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.testSuccess = function (test, input, expected) {

    var _this = this;

    return this.run(input).then(
        function (result) {

            if (expected !== undefined) {
                console.log(result);
                test.equal(result, expected);
            }

            // this is in here to let us wait on tests that end with a dispatch
            // todo do we still need this?
            setImmediate(test.done.bind(test));
        },
        function (err) {
            console.error("error running " + _this.program + ".exa: " + err);
            console.error(err.stack);
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.testFailure = function (test, input, expected) {

    this.run(input).then(
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