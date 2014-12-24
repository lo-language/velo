/**
 * compiles and runs simple programs to test the compiler
 *
 * Created by: spurcell
 * 12/24/14
 */

"use strict";

var parser = require('../../parser/Parser');
var compiler = require('../../codegen/Compiler');
var util = require('util');
var fs = require('fs');

// create a class that takes a program and some inputs/expected outputs?

module.exports['factorial'] = {

    "setUp": function (cb) {

        var source = fs.readFileSync(__dirname +  '/../../examples/factorial.exa', 'utf8');

        var ast = parser.parse(source);
        var js = compiler.compile(ast);

        // load the js

        eval("var program = " + js + ';');

//        main([10], recur, reply, fail);

        cb();
    },

    'success': function (test) {

        test.done();
    }
};