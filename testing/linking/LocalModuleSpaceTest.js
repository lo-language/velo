/**
 * Created by spurcell on 5/28/16.
 */


const LMS = require('../../linker/LocalModuleSpace');
const util = require('util');

module.exports['acquire'] = {

    "file success": function (test) {

        test.expect(3);

        var lms = new LMS(__dirname + '/../programs');

        lms.acquire("factorial").then(mod => {

            test.deepEqual(mod.deps, []);
            test.equal(mod.defs[0].name, 'main');
            test.equal(mod.name, 'factorial');
            test.done();
        });
    },

    "failure": function (test) {

        test.expect(1);

        var lms = new LMS(__dirname);

        lms.acquire("collections").then(
            test.fail.bind(test),
            function (err) {

                test.equal(err.message.indexOf("couldn't find module"), 0);
                test.done();
            }
        );
    }
};