/**
 * Created by spurcell on 5/28/16.
 */


const Sourcer = require('../../pipeline/Sourcer');
const util = require('util');

module.exports['basics'] = {

    "file success": function (test) {

        test.expect(1);

        var sourcer = new Sourcer(__dirname + '/../programs');

        sourcer.acquire("factorial").then(mod => {

            console.log(mod);
            test.done();
        });
    },

    "failure": function (test) {

        test.expect(1);

        var sourcer = new Sourcer(__dirname);

        sourcer.acquire("collections").then(
            test.fail.bind(test),
            function (err) {

                test.equal(err.message.indexOf("couldn't find module"), 0);
                test.done();
            }
        );
    }
};