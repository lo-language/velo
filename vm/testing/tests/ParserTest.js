/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";
var fs = require('fs');
var parser = require('../../Parser');

var OpNode = require('../../OpNode');
var Procedure = require('../../Procedure');
var Identifier = require('../../Identifier');

//        var source = fs.readFileSync(__dirname + '/literals.gel', 'utf8');

exports["literals"] = {

    "numbers": function (test) {

        var result = parser.parse("42; 63.4;");

        test.deepEqual(result, [ 42, 63.4 ]);
        test.done();
    },

    "strings": function (test) {

        var result = parser.parse('"hello, world!";');

        test.deepEqual(result, [ "hello, world!" ]);
        test.done();
    },

    "booleans": function (test) {

        var result = parser.parse('true;');

        test.deepEqual(result, [ true ]);
        test.done();
    }
};

exports["assignment"] = {

    "integers": function (test) {

        var result = parser.parse("count = 42; age = 63.4;");

        test.deepEqual(result, [
            new OpNode('=', new Identifier('count'), 42),
            new OpNode('=', new Identifier('age'), 63.4) ]);
        test.done();
    },

    "strings": function (test) {

        var result = parser.parse('message = "hello, world!";');

        test.deepEqual(result, [
            new OpNode('=', new Identifier('message'), "hello, world!") ]);
        test.done();
    },

    "booleans": function (test) {

        var result = parser.parse('value = true;');

        test.deepEqual(result, [
            new OpNode('=', new Identifier('value'), true) ]);
        test.done();
    }
};