/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var LoContext = require('../../codegen/LoContext');
var JsContext = require('../../codegen/JsContext');
var Lo = require('../../constructs');
var util = require('util');

module.exports["statement lists"] = {

    "independent": function (test) {

        var node = new Lo.stmtList(
            new Lo.assign(new Lo.identifier('foo'), new Lo.number('42'), '='),
            new Lo.stmtList(
                new Lo.assign(new Lo.identifier('bar'), new Lo.number('57'), '=')
            )
        );

        test.equal(node.compile2(new LoContext().createInner(), new JsContext()).renderJs(),
            '$foo = 42;\n$bar = 57;\n');
        test.done();
    },

    "dependent": function (test) {

        var node = new Lo.stmtList(
            new Lo.assign(new Lo.identifier('foo'),
                new Lo.requestExpr(
                    new Lo.identifier('bar'), [new Lo.number('42')]),
                '='),
            new Lo.stmtList(
                new Lo.assign(new Lo.identifier('baz'), new Lo.number('57'), '=')
            )
        );

        test.equal(node.compile2(new LoContext().createInner(), new JsContext()).renderJs(),
            'task.sendAndBlock($bar, [42], function (res0) {\n\n$foo = res0[0];\n$baz = 57;\n}, null);\n');
        test.done();
    }
};
