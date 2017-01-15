/**
 * Test harness for loading in programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

const Sourcer = require('../pipeline/Sourcer');
const Program = require('../pipeline/Program');



var __ = function (sourceDir, mainModName) {

    this.sourcer = new Sourcer(sourceDir);
    this.mainModName = mainModName;
    this.dump = false;
};



__.prototype.enableDump = function () {

    this.dump = true;
};


/**
 *
 */
__.prototype.run = function (args) {

    return this.sourcer.acquire(this.mainModName).then(
        main => {

            var program = new Program(main, this.sourcer);

            if (this.dump) {
                console.log(main.compile().renderJs());
            }

            return program.run(args);
        }
    );


    // return this.program.compile().then(
    //     () => {
    //
    //         if (this.dump) {
    //             console.log(this.program.render());
    //         }
    //
    //         return this.program.run(args);
    //     }
    // );
};



__.prototype.testSuccess = function (test, args, expected) {

    return this.run(args).then(
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

    return this.run(args).then(
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
