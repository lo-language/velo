/**
 * Created by: spurcell
 * 3/14/15
 */

"use strict";

function flatten (list) {

    // flatten CSVs
    if (typeof list == 'object' && list.csv !== undefined) {

        return flatten(list.csv.reduce(function (prev, current, index) {

            if (index > 0) {
                prev.push(',');
            }

            return prev.concat(current);
        }, []));
    }

    // flatten arrays
    if (Array.isArray(list)) {

        return list.reduce(function (prev, current, index) {
            return prev.concat(flatten(current));
        }, []);
    }

    // base case
    return list;
};

module.exports = {

    "basics": function (test) {

        test.equal(flatten('nork'), 'nork');
        test.deepEqual(flatten(['pork', 'stork']), ['pork', 'stork']);
        test.deepEqual(flatten(['pork', 'stork', ['hork', 'nork']]), ['pork', 'stork', 'hork', 'nork']);

        test.done();
    },

    "csvs": function (test) {

        test.deepEqual(flatten({csv: ['nork']}), ['nork']);
        test.deepEqual(flatten({csv: ['pork', 'stork']}), ['pork', ',', 'stork']);
        test.deepEqual(flatten(['pork', 'stork', {csv: ['hork', 'nork']}]), ['pork', 'stork', 'hork', ',', 'nork']);
        test.deepEqual(flatten({csv: ['pork', 'stork', {csv: ['hork', 'nork']}]}), ['pork', ',', 'stork', ',', 'hork', ',', 'nork']);

        test.deepEqual(flatten({csv: [
            'pork', 'stork', ['el', 'chupacabra', {csv: [
                'hork', 'nork']}]]}), ['pork', ',', 'stork', ',', 'el', 'chupacabra', 'hork', ',', 'nork']);

        test.done();
    }
};