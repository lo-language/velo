/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["connection"] = {

    "basic": function (test) {

        var node = {
            type: 'connection',
            connecofr: '>>',
            source: {type: 'id', name: 'foo'},
            sink: {type: 'id', name: 'bar'}
        };

        test.equal(Compiler.compile(node).render(), '$foo.call(null,$bar)');
        test.done();
    }
};
