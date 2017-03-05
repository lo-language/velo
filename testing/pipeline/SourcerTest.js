/**
 * Created by spurcell on 5/28/16.
 */


const Sourcer = require('../../pipeline/Sourcer');
const util = require('util');

module.exports['basics'] = {

    "file success": function (test) {

        test.expect(3);

        var sourcer = new Sourcer(__dirname + '/../programs');

        sourcer.acquire(null, "factorial").then(mod => {

            test.deepEqual(mod.deps, []);
            test.equal(mod.defs[0].name, 'main');
            test.equal(mod.name, 'factorial');
            test.done();
        });
    },

    "failure": function (test) {

        test.expect(1);

        var sourcer = new Sourcer(__dirname);

        sourcer.acquire(null, "collections").then(
            test.fail.bind(test),
            function (err) {

                test.equal(err.message.indexOf("couldn't find module"), 0);
                test.done();
            }
        );
    }
};