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

var Harness = require('../Harness');
var Q = require('q');
var util = require('util');
var programDir = __dirname;

module.exports['attach'] = {

    "setUp": function (cb) {

        this.harness = new Harness(programDir, 'attach');

        this.harness.load(cb);
    },

    'success': function (test) {

//        console.log(util.inspect(this.harness.getJs(), {depth: null, colors: true}));
//        console.log(this.harness.getJs().render(true));
        this.harness.success(test, [], 120);
    },

//    'failure': function (test) {
//        this.harness.failure(test, [-1], 'I pity the fool!');
//    }
};

//module.exports['errors'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(programDir, 'errors');
//
//        this.harness.load(cb);
//    },
//
//    'success': function (test) {
//
////        console.log(util.inspect(this.harness.getJs(), {depth: null, colors: true}));
//        console.log(this.harness.getJs().render(true));
//        this.harness.success(test, [], 14);
//    }
//};

module.exports['deps'] = {

    "setUp": function (cb) {

        this.harness = new Harness(programDir, 'deps');

        this.harness.load(cb);
    },

    'success': function (test) {
        this.harness.success(test, [], 14);
    }
};

module.exports['conditionals'] = {

    "setUp": function (cb) {

        this.harness = new Harness(programDir, 'conditionals');

        this.harness.load(cb);
    },

    'neg': function (test) {
        this.harness.success(test, [-1], 'negative');
    },

    'zero': function (test) {
        this.harness.success(test, [0], 'zero!');
    },

    'pos': function (test) {
        this.harness.success(test, [1], 'positive');
    }
};

module.exports['factorial'] = {

    "setUp": function (cb) {

        this.harness = new Harness(programDir, 'factorial');

        this.harness.load(cb);
    },

    'success': function (test) {
        this.harness.success(test, [10], 3628800);
    },

    'failure': function (test) {
        this.harness.failure(test, [-1], 'I pity the fool!');
    }
};

module.exports['fibonacci'] = {

    "setUp": function (cb) {

        this.harness = new Harness(programDir, 'fibonacci');

        this.harness.load(cb);
    },

    'success': function (test) {
        this.harness.success(test, [10], 55);
    },

    'failure': function (test) {
        this.harness.failure(test, [-1], 'Whatsamatta, you?');
    }
};

module.exports['collections'] = {

    "setUp": function (cb) {

        this.harness = new Harness(programDir, 'collections');

        this.harness.load(cb);
    },

    'all': function (test) {

        this.harness.success(test);
    }
};

//module.exports['factorial2'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(programDir, 'factorial2');
//
//        this.harness.load(cb);
//    },
//
//    'success': function (test) {
//
//        this.harness.success(test, 10, 3628800);
//    },
//
//    'failure': function (test) {
//
//        this.harness.failure(test, -1, "I pity the fool!");
//    }
//};
//
//module.exports['fibonacci2'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(programDir, 'fibonacci2');
//
//        this.harness.load(cb);
//    },
//
//    'success': function (test) {
//
//        this.harness.success(test, 10, 55);
//    },
//
//    'failure': function (test) {
//
//        this.harness.failure(test, -1, "Whatsamatta, you?");
//    }
//};

module.exports['procedure'] = {

    "setUp": function (cb) {

        this.harness = new Harness(programDir, 'procedure');

        this.harness.load(cb);
    },

    'success': function (test) {

        this.harness.success(test, [], 60);
    }
};