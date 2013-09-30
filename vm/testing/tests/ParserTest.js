/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";
var fs = require('fs');
var parser = require('../../Parser');

var ASTNode = require('../../ASTNode');
var Procedure = require('../../Procedure');
var Identifier = require('../../Identifier');

//        var source = fs.readFileSync(__dirname + '/literals.gel', 'utf8');

var tests = {

    literals: {

        booleans: [
            'true; false;',
            [ true, false ]
        ],

        numbers: [
            "42; 63.4;",
            [ 42, 63.4 ]
        ],

        strings: [
            '"hello, world!";',
            [ "hello, world!" ]
        ]
    },

    assignment: {

        integers: [
            "count = 42; age = 63.4;",
            [
                new ASTNode('=', new Identifier('count'), 42),
                new ASTNode('=', new Identifier('age'), 63.4) ]
        ],

        "booleans": [
            'value = true;',
            [
                new ASTNode('=', new Identifier('value'), true) ]
        ],

        "strings": [
            'message = "hello, world!";',
            [
                new ASTNode('=', new Identifier('message'), "hello, world!") ]
        ]
    }
};

Object.keys(tests).forEach(function (groupName) {

    var group = tests[groupName];
    var testGroup = module.exports[groupName] = {};

    Object.keys(group).forEach(function (key) {

        var input = group[key][0];
        var expected = group[key][1];

        testGroup[key] = function (test) {

            var result = parser.parse(input);

            test.deepEqual(result, expected);
            test.done();
        };
    });
});