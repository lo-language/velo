/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var fs = require('fs');
var path = require('path');
var parser = require('../Parser');

var EXT = '.opk';

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
        var result = parser.parse(source);

        test.deepEqual(JSON.stringify(result), expected);
        test.done();
    };
});

// go through the errors directory and make sure they all fail
var errorFiles = fs.readdirSync(__dirname + '/errors');

errorFiles.forEach(function (filename) {

    if (path.extname(filename) !== EXT) {
        return;
    }

    var name = path.basename(filename, EXT);

    module.exports['error - ' + name] = function (test) {

        var source = fs.readFileSync(__dirname + '/errors/' + filename, 'utf8');

        test.throws(function () {
            var result = parser.parse(source);
            console.log(JSON.stringify(result));
        });

        test.done();
    };
});