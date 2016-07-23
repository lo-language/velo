/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["sequence"] = {

    // "basic": function (test) {
    //
    //     var node = {
    //         type: 'sequence',
    //         first: {type: 'number', val: '2'},
    //         last: {type: 'id', name: 'n'}
    //     };
    //
    //     test.equal(new Context().compile(node).render(), 'function (first, last, action) {\nfor (var num = first; num <= last; num++) { action(num); }}.bind(null,2,$n)');
    //     test.done();
    // }
};
