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
