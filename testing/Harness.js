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
    this.dump = false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.enableDump = function () {

    this.dump = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.run = function (args) {

    return this.program.compile().then(
        () => {

            if (this.dump) {
                console.log(this.program.render());
            }

            return this.program.run(args);
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.testSuccess = function (test, args, expected) {
    
    return this.run(args).then(
            function (result) {

                if (expected !== undefined) {
                    console.log(result);
                    test.equal(result, expected);
                }

                test.done();

                // this was in here to let us wait on tests that end with a dispatch
                // setImmediate(test.done.bind(test));
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
