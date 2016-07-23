/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var JsKit = require('../../../codegen/JsKit');
var JS = JsKit.parts;
var util = require('util');

module.exports["cardinality"] = {

    "generates js expression": function (test) {

        var node = {
            type: 'cardinality',
            operand: {type: 'id', name: 'foo'}
        };

        // todo throw runtime error if none match?
        // todo can get rid of function call here with conditional operator

        test.deepEqual(new Context().compile(node), JS.fnCall(
            JS.select(JS.ID('task'), 'cardinality'),
            [JS.ID('$foo')]));

        test.done();
    }
};
