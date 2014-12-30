/**
 * compiles and runs simple programs to test the compiler
 *
 * could alternatively load a bunch of modules in at the top and then just hit them in tests
 * or have sets of expected input -> expected output mappings and automate it
 *
 * Created by: spurcell
 * 12/24/14
 */

"use strict";

var ExaModule = require('../../loader/ExaModule');
var util = require('util');
var fs = require('fs');
var programDir = __dirname +  '/../programs';

var TestRunner = function (program) {

    this.file = programDir + '/' + program + '.exa';
};

TestRunner.prototype.load = function (cb) {

    var self = this;

    fs.readFile(this.file, 'utf8', function (err, source) {

        self.module = new ExaModule(source);

        cb();
    });
};

TestRunner.prototype.getJs = function () {

    return this.module.compile();
};

TestRunner.prototype.success = function (test, input, expected) {

    this.module.run(input).then(
        function (result) {

            if (expected !== undefined) {
                test.equal(result, expected);
            }

            test.done();
        }
    ).done();
};

TestRunner.prototype.failure = function (test, input, expected) {

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

module.exports['conditionals'] = {

    "setUp": function (cb) {

        this.runner = new TestRunner('conditionals');

        this.runner.load(cb);
    },

    'neg': function (test) {

        this.runner.success(test, -1, 'negative');
    },

    'zero': function (test) {

        this.runner.success(test, 0, 'zero!');
    },

    'pos': function (test) {

        this.runner.success(test, 1, 'positive');
    }
};

module.exports['factorial'] = {

    "setUp": function (cb) {

        this.runner = new TestRunner('factorial');

        this.runner.load(cb);
    },

    'success': function (test) {

        this.runner.success(test, 10, 3628800);
    },

    'failure': function (test) {

        this.runner.failure(test, -1, 'I pity the fool!');
    }
};

module.exports['fibonacci'] = {

    "setUp": function (cb) {

        this.runner = new TestRunner('fibonacci');

        this.runner.load(cb);
    },

    'success': function (test) {

        this.runner.success(test, 10, 55);
    },

    'failure': function (test) {

        this.runner.failure(test, -1, 'Whatsamatta, you?');
    }
};

module.exports['collections'] = {

    "setUp": function (cb) {

        this.runner = new TestRunner('collections');

        this.runner.load(cb);
    },

    'all': function (test) {

        this.runner.success(test);
    }
};