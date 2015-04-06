/**
 * Test harness for loading in Exa programs, compiling and running them with assertions on their output.
 *
 * Created by: spurcell
 * 4/5/15
 */

"use strict";

var ExaModule = require('../loader/ExaModule');
var fs = require('fs');

var __ = function (dir, program) {

    this.file = dir + '/' + program + '.exa';
};

__.prototype.load = function (cb) {

    var self = this;

    fs.readFile(this.file, 'utf8', function (err, source) {

        if (err) {
            cb(err);
            return;
        }

        self.module = new ExaModule(source);

        cb();
    });
};

__.prototype.getJs = function (cb) {

    return this.module.compile();
};

__.prototype.success = function (test, input, expected) {

    this.module.run(input).then(
        function (result) {

            if (expected !== undefined) {
                test.equal(result, expected);
            }

            test.done();
        }
    ).done();
};

__.prototype.failure = function (test, input, expected) {

    this.module.run(input).then(
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