/**
 * Test harness for loading in Exa programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

const Loader = require('../runtime/Loader');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var __ = function (sourceDir, program) {

    this.loader = new Loader(sourceDir);
    this.program = program;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the JSConstruct for this program.
 *
 * @return {String|*}
 */
__.prototype.getJs = function () {

    return this.module.getJs();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.run = function (input) {

    return this.loader.run(this.program, input);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.testSuccess = function (test, input, expected) {

    var _this = this;

    return this.run(input).then(
        function (result) {

            if (expected !== undefined) {
                test.equal(result, expected);
            }

            // this is in here to let us wait on tests that end with a dispatch
            // todo figure out a way to remove this
            setImmediate(test.done.bind(test));
        },
        function (err) {
            console.error("error running " + _this.program + ".exa: " + err);
            console.error(_this.getJs());
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