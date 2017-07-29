/*
 * Author: Seth Purcell
 * 6/20/15
 */


"use strict";

var Util = require('../../runtime/Util');

module.exports['runtime methods'] = {

    "concat": function (test) {
        
        // two arrays
        test.deepEqual(Util.concat([0, 1], [2, 3]), [0, 1, 2, 3]);

        // left atom, right array
        test.deepEqual(Util.concat(8, [2, 3]), [8, 2, 3]);

        // right atom, left array
        test.deepEqual(Util.concat([2, 3], 18), [2, 3, 18]);

        // two atoms
        test.deepEqual(Util.concat(42, 57), [42, 57]);

        // two strings - we treat strings like arrays!
        test.equal(Util.concat("vic", "thrill"), "victhrill");

        test.done();
    },

    "scan array": function (test) {

        var fruit = ["apple", "orange", "banana"];

        var items = [];

        Util.scan(fruit, function (args) {

            var $item = args[0];
            items.push($item);
        });

        test.deepEqual(items, fruit);
        test.done();
    },

    "scan object": function (test) {

        var crew = {"Fry": "human", "Leela": "mutant", "Zoidberg": "alien"};

        var items = [];

        Util.scan(crew, function (args) {

            var $name = args[0];
            var $kind = args[1];

            items.push([$name, $kind]);
        });

        test.deepEqual(items, [
            [ 'Fry', 'human' ],
            [ 'Leela', 'mutant' ],
            [ 'Zoidberg', 'alien' ] ]);

        test.done();
    }
};