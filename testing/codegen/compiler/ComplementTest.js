/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["complement"] = {

    "generates js expression": function (test) {

        var node = {
            type: 'complement',
            operand: {type: 'id', name: 'foo'}
        };

        test.equal(new Context().compile(node).render(), "!$foo");
        test.done();
    }
};
