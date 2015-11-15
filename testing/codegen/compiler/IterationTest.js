/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var JsConstruct = require('../../../codegen/JsConstruct');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["basics"] = {

    "sync loop": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();

        var a = Compiler.compile(node, scope);

        test.equal(a.render(),
            'var loop = function () {if ($foo) {$bar = 42;\nsetImmediate(loop);}else {}};\n\nloop();\n');

        // try attaching a statement
        a.attach(new JsConstruct("var z = 57;"));

        test.equal(a.render(),
            'var loop = function () {if ($foo) {$bar = 42;\nsetImmediate(loop);}else {var z = 57;}};\n\nloop();\n');

        // try attaching another statement
        a.attach(new JsConstruct("var bee = 27;"));

        test.equal(a.render(),
            'var loop = function () {if ($foo) {$bar = 42;\nsetImmediate(loop);}else {var z = 57;var bee = 27;}};\n\nloop();\n');


        test.done();
    }
};
