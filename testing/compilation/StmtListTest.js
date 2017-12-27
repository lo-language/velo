/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var LoContext = require('../../compiler/LoContext');
var Lo = require('../../constructs');
var JsWriter = require('../../codegen/JsWriter');
var util = require('util');

module.exports["statement lists"] = {

    "independent": function (test) {

        var node = new Lo.stmtList(
            new Lo.assign(new Lo.identifier('foo'), new Lo.number('42'), '='),
            new Lo.stmtList(
                new Lo.assign(new Lo.identifier('bar'), new Lo.number('57'), '=')
            )
        );

        test.equal(new JsWriter().generateJs(node.compile(new LoContext())).renderJs(),
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

        var js = new JsWriter().generateJs(node.compile(new LoContext(), []));

        test.equal(js.renderJs(),
            'task.sendAndBlock($bar, [42], function (res0) {\n\n$foo = res0[0];\n$baz = 57;\n}, null);\n');
        test.done();
    }
};
