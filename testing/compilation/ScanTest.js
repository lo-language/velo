/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');
const JsWriter = require('../../codegen/JsWriter');

module.exports["basics"] = {

    "array scan": function (test) {

        // scan foo -> (item) {
        //    count = 1;
        // }
        
        var node = new Lo.scan(
            new Lo.identifier('foo'),
            new Lo.procedure(
                ['item'],
                new Lo.stmtList(new Lo.assign(new Lo.identifier('count'), new Lo.number('1')))));

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext())).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'Util' ], 'scan' ],
                    [ [ 'id', '$foo' ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', [ '$item', '$count' ] ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign',
                                            [ 'id', '$item' ],
                                            [ 'subscript', [ 'id', 'args' ], [ 'num', '0' ] ] ] ],
                                    [ 'stmtList', [ 'expr-stmt', [ 'assign', [ 'id', '$count' ], [ 'num', '1' ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    },


    "scan with async proc body and following stmt": function (test) {

        // scan items >> (item) {
        //
        //      write <- 1;
        // }

        /*

        task.sendMessage(proc, [items[]],


         */

        // can we reduce this to a while loop?

        var node = new Lo.scan(
            new Lo.identifier('items'),
            new Lo.procedure(
                ['item'],
                new Lo.stmtList(
                    new Lo.requestStmt(new Lo.identifier('write'), [new Lo.number('1')]))));

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext())).renderTree(), [ 'stmtList' ]);

        test.done();
    }
};
