/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const Lo = require('../../constructs');

module.exports["service"] = {

    "basic": function (test) {

        // should actually throw an error if result isn't defined in the context

        var node = new Lo.procedure(
            ['next'],
            new Lo.stmtList(
                new Lo.assignment(
                    '*=',
                    new Lo.identifier('result'),
                    new Lo.requestExpr(
                        new Lo.identifier('bar'),
                        [new Lo.literal('number', '42')]
                    )
                )
            ),
            true
        );

        var result = [ 'function',
            null,
            [ 'task' ],
            [ 'stmtList',
                [ 'var', '$next' ],
                [ 'stmtList',
                    [ 'var', '$result' ],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign',
                                [ 'id', '$next' ],
                                [ 'subscript',
                                    [ 'select', [ 'id', 'task' ], 'args' ],
                                    [ 'num', '0' ] ] ] ],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'call',
                                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                    [ [ 'id', '$bar' ],
                                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                                        [ 'function',
                                            null,
                                            [ 'res0' ],
                                            [ 'stmtList', [ 'expr-stmt',
                                                [ "assign", [ "id", "$result" ], [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ], "*="] ] ] ],
                                        [ 'null' ] ] ] ] ] ] ] ] ];

        test.deepEqual(node.compile(new Context()).renderTree(), result);

        // test.equal(new Context().compile(node),
        //     'function (task) {var $recur = task.service;\nvar $next, $result;\n\n$next = task.args[0];\n\n' +
        //     'task.sendMessage($bar, [42], function (res) {\nvar P0 = res ? res[0] : null;\n$result *= P0;\n}, null);\n\n}');
        test.done();
    }
};
