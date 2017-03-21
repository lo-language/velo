/**
 * Created by spurcell on 5/28/16.
 */

const LoadAndGo = require('../../pipeline/LoadAndGo');
const LMS = require('../../pipeline/LocalModuleSpace');
const util = require('util');

module.exports['basics'] = {

    "success": function (test) {

        // test.expect(3);

        var lms = new LMS(__dirname + '/../programs');
        var program = new LoadAndGo(lms, 'factorial');

        program.run([10]).then(function () {

            test.done();
        }
        ).done();
    }
};