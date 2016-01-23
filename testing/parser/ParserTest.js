/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var fs = require('fs');
var path = require('path');

const antlr4 = require('antlr4');
const Lexer = require('../../gen/exaLexer');
const Parser = require('../../gen/exaParser');

var EXT = '.exa';

// go through the tests directory and generate a test for each file
var files = fs.readdirSync(__dirname + '/inputs');

files.forEach(function (filename) {

    if (path.extname(filename) !== EXT) {
        return;
    }

    var name = path.basename(filename, EXT);

    module.exports[name] = function (test) {

        var source = fs.readFileSync(__dirname + '/inputs/' + filename, 'utf8');
        var expected = fs.readFileSync(__dirname + '/outputs/' + name + '.json', 'utf8');
        var result = parse(source);

        // we shouldn't have to stringify both of these but if we don't, we get a test fail
        //test.deepEqual(JSON.stringify(result), JSON.stringify(JSON.parse(expected)));
        test.done();
    };
});

function parse (source) {

    var chars = new antlr4.InputStream(source);
    var lexer = new Lexer.exaLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);
    var parser = new Parser.exaParser(tokens);
    parser.buildParseTrees = true;

    var tree = parser.module();

    console.log(tree);
}

function printTree (tree) {



}