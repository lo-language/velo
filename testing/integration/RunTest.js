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

module.exports['factorial'] = {

    "setUp": function (cb) {

        var self = this;

        fs.readFile(programDir + '/factorial.exa', 'utf8', function (err, source) {

            self.module = new ExaModule(source);

            cb();
        });
    },

    'success': function (test) {

        this.module.run(-1).then(
            function (result) {

                test.equal(result, 3628800);
                test.done();
            },
            function (err) {
                test.equal(err, 'I pity the fool!');
                test.done();
            }
        );
    },

    'failure': function (test) {

        this.module.run(-1).then(
            function () {
                test.fail("crap");
                test.done();
            },
            function (err) {
                test.equal(err, 'I pity the fool!');
                test.done();
            }
        );
    }
};

module.exports['fibonacci'] = {

    "setUp": function (cb) {

        var self = this;

        fs.readFile(programDir +  '/fibonacci.exa', 'utf8', function (err, source) {

            self.module = new ExaModule(source);

            cb();
        });
    },

    'success': function (test) {

        this.module.run(10).then(
            function (result) {

                test.equal(result, 55);
                test.done();
            }
        );
    },

    'failure': function (test) {

        this.module.run(-1).then(
            function () {
                test.fail("crap");
                test.done();
            },
            function (err) {
                test.equal(err, 'Whatsamatta, you?');
                test.done();
            }
        );
    }
};

module.exports['conditionals'] = {

    "setUp": function (cb) {

        var self = this;

        fs.readFile(programDir +  '/conditionals.exa', 'utf8', function (err, source) {

            self.module = new ExaModule(source);

            cb();
        });
    },

    'neg': function (test) {

        this.module.run(-1).then(
            function (result) {

                test.equal(result, 'negative');
                test.done();
            }
        );
    },

    'zero': function (test) {

        this.module.compile();
        console.log(this.module.js);
        this.module.run(0).then(
            function (result) {

                test.equal(result, 'zero');
                test.done();
            }
        );
    },

    'pos': function (test) {

        this.module.run(1).then(
            function (result) {

                test.equal(result, 'positive');
                test.done();
            }
        );
    }
};