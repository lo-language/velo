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

        sourcer.acquire("fail").then(
            function (main) {

                // console.log(util.inspect(main.getAst(), {depth: null}));

                var program = new Program(main);

                console.log(main.compile().renderJs());

                return program.run([{
                    ok: function (task) {

                    }
                }]);
            }
        ).then(
            function (res) {

                console.log(res);

                test.done();
            }
        ).done();
    }
};



// const $main = function (task) {
//
//     var $n;
//     $n = task.args[0];
//
//     if ($n < 0) {
//         task.respond('fail', ['Whatsamatta, you?']);
//         return;
//     }
//
//     if ($n <= 1) {
//         task.respond('reply', [$n]);
//         return;
//     }
//
//     task.sendMessage($main, [($n - 1)], function (res0) {
//
//         task.sendMessage($main, [($n - 2)], function (res1) {
//
//             task.respond('reply', [(res0 + res1)]);
//             return;
//         }, null);
//     }, null);
// };
//
// module.exports.$main = $main;