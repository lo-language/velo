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

        test.deepEqual(JSON.stringify(result), expected);
        test.done();
    };
});

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