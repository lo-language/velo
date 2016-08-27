/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
var util = require('util');

module.exports["service"] = {

    "basic": function (test) {

        // should actually throw an error if result isn't defined in the context

        var node = {
            type: 'procedure',
            params: ['next'],
            body: {
                type: 'stmt_list',
                head:
                    { type: 'assign',
                        op: '*=',
                        left: { type: 'id', name: 'result' },
                        right: {
                            type: 'application',
                            address: {type: 'id', name: 'bar'},
                            args: [
                                {type: 'number', val: '42'}
                            ]} },
                tail: null}
        };

        var result = [ 'function',
            null,
            [ 'task' ],
            [ 'stmtList',
                [ 'var', '$next' ],
                [ 'stmtList',
                    [ 'var', '$result' ],
                    [ 'stmtList', [ 'expr-stmt',
                        [ 'assign',
                            [ 'id', '$next' ],
                            [ 'subscript',
                                [ 'select', [ 'id', 'task' ], 'args' ],
                                [ 'num', '0' ] ] ] ],
                        [ 'stmtList', [ 'expr-stmt',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                [ [ 'id', '$bar' ],
                                    [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                                    [ 'function',
                                        null,
                                        [ 'P0' ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'assign', [ 'id', '$result' ], [ 'id', 'P0' ], '*=' ] ] ] ] ] ] ] ] ] ] ] ];

        test.deepEqual(new Context().compile(node).renderTree(), result);

        // test.equal(new Context().compile(node),
        //     'function (task) {var $recur = task.service;\nvar $next, $result;\n\n$next = task.args[0];\n\n' +
        //     'task.sendMessage($bar, [42], function (res) {\nvar P0 = res ? res[0] : null;\n$result *= P0;\n}, null);\n\n}');
        test.done();
    }
};
