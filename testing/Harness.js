/**
 * Test harness for loading in programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

const LocalModuleSpace = require('../linker/LocalModuleSpace');
const LoadAndGo = require('../linker/LoadAndGo');


var __ = function (sourceDir, mainModName) {

    this.localSpace = new LocalModuleSpace(sourceDir);
    this.program = new LoadAndGo(this.localSpace, mainModName);
    this.mainModName = mainModName;
    this.dump = false;
};



__.prototype.enableDump = function () {

    this.dump = true;
};


__.prototype.dumpModules = function () {

    return this.localSpace.resolve(this.program).then(() => {

        this.localSpace.dumpModules(process.stdout);
    });
};


/**
 *
 */
__.prototype.run = function (args) {

    return this.program.run(args);
};



__.prototype.testSuccess = function (test, args, expected) {

    return this.program.run(args).then(
        result => {

            if (expected !== undefined) {
                console.log(result);
                test.equal(result, expected);
            }

            test.done();
        },
        err => {

            console.error("error running test", err);
            console.error(err.stack);

            test.fail();
        }
    );
};



__.prototype.testFailure = function (test, args, expected) {

    return this.program.run(args).then(
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
