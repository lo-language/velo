/**
 * Test harness for loading in Exa programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

const Sourcer = require('../pipeline/Sourcer');
const Program = require('../codegen/Program');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var __ = function (sourceDir, mainMod) {

    this.program = new Program(new Sourcer(sourceDir), mainMod);
    this.mainMod = mainMod;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.run = function (input) {

    return this.program.compile().then(
        () => {
            // console.log(this.program.render());
            return this.program.run(input);
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.testSuccess = function (test, input, expected) {
    
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

    return this.program.include(this.mainMod).then(() => {
        return this.program.run(input);
    }).then(
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
