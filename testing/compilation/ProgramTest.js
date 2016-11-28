/**
 * Created by: spurcell
 * 4/3/15
 */

"use strict";

const Program = require('../../codegen/Program2');
const Lo = require('../../constructs');
const Sourcer = require('../../pipeline/Sourcer');
const util = require('util');


module.exports["basics"] = {

    "load": function (test) {

        var sourcer = new Sourcer('testing/programs');

        sourcer.acquire("factorial").then(
            function (main) {

                // console.log(util.inspect(main.getAst(), {depth: null}));

                var program = new Program(main);

                return program.run([10]);
            }
        ).then(
            function (res) {

                console.log(res);

                test.done();
            }
        ).done();
    }
};