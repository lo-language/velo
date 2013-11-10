/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var fs = require('fs');
var path = require('path');
var parser = require('../Parser');

// go through the tests directory and generate a test for each file
var files = fs.readdirSync(__dirname + '/inputs');

files.forEach(function (file) {

    var name = path.basename(file, '.opake');

    module.exports[name] = function (test) {

        var source = fs.readFileSync(__dirname + '/inputs/' + file, 'utf8');
        var expected = fs.readFileSync(__dirname + '/outputs/' + name + '.json', 'utf8');
        var result = parser.parse(source);

        test.deepEqual(result, expected);
        test.done();
    };
});

//        var source = fs.readFileSync(__dirname + '/literals.gel', 'utf8');

//var tests = {
//
//    literals: {
//
//        booleans: [
//            'true false',
//            [ true, false ]
//        ],

//        numbers: [
//            "42 63.4",
//            [ 42, 63.4 ]
//        ],
//
//        strings: [
//            '"hello, world!"',
//            [ "hello, world!" ]
//        ]
//    },

//    identifiers: {
//
//        lvalues: [
//            'age = 17;',
//            [ new ASTNode('=', new Identifier('age'), 17) ]
//        ],
//
//        rvalues: [
//            'age = count;',
//            [ new ASTNode('=', new Identifier('age'), new Identifier('count')) ]
//        ]
//    },
//
//    assignment: {
//
//        integers: [
//            "count = 42; age = 63.4;",
//            [
//                new ASTNode('=', new Identifier('count'), 42),
//                new ASTNode('=', new Identifier('age'), 63.4) ]
//        ],
//
//        "booleans": [
//            'value = true;',
//            [
//                new ASTNode('=', new Identifier('value'), true) ]
//        ],
//
//        "strings": [
//            'message = "hello, world!";',
//            [
//                new ASTNode('=', new Identifier('message'), "hello, world!") ]
//        ]
//    },
//
//    add: {
//
//        literals: [
//            "43 + 42;",
//            [
//                new ASTNode('+', 43, 42)]
//        ],
//
//        refPlusLiteral: [
//            "age + 42;",
//            [
//                new ASTNode('+', new Identifier('age'), 42)]
//        ],
//
//        refs: [
//            "age + years;",
//            [
//                new ASTNode('+', new Identifier('age'), new Identifier('years'))]
//        ],
//
//        strings: [
//            '"hello " + "bob";',
//            [
//                new ASTNode('+', "hello", "bob")]
//        ]
//    }
//};

//Object.keys(tests).forEach(function (groupName) {
//
//    var group = tests[groupName];
//    var testGroup = module.exports[groupName] = {};
//
//    Object.keys(group).forEach(function (key) {
//
//        var input = '() {\n' + group[key][0] + '\n}';
//        var expected = group[key][1];
//
//        testGroup[key] = function (test) {
//
//            var result = parser.parse(input);
//
//            test.deepEqual(result, expected);
//            test.done();
//        };
//    });
//});