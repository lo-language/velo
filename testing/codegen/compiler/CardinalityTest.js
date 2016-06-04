/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["cardinality"] = {

    "generates js expression": function (test) {

        var node = {
            type: 'cardinality',
            operand: {type: 'id', name: 'foo'}
        };

        // todo throw runtime error if none match?
        // todo can get rid of function call here with conditional operator

        test.equal(new Context().compile(node).render(),
            "function (val) {" +
                "if (typeof val === 'string') return val.length;" +
                "else if (Array.isArray(val)) return val.length;" +
                "else if (typeof val === 'object') return Object.keys(val).length;}($foo)");

        test.done();
    }
};
