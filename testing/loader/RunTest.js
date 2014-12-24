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

module.exports['factorial'] = {

    "setUp": function (cb) {

        var self = this;

        fs.readFile(__dirname +  '/../../examples/factorial.exa', 'utf8', function (err, source) {

            self.module = new ExaModule(source);

            cb();
        });
    },

    'success': function (test) {

        this.module.run(10).then(
            function (result) {

                test.equal(result, 3628800);
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

        fs.readFile(__dirname +  '/../../examples/fibonacci.exa', 'utf8', function (err, source) {

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
                test.equal(err, 'whatsamatta, you?');
                test.done();
            }
        );
    }
};