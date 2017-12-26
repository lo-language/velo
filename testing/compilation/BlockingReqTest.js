/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 6/24/17.
 */

"use strict";

const BlockingReq = require('../../compiler/BlockingReq');
const JS = require('../../codegen/JsPrimitives');
const CFNode = require('../../compiler/CFNode');
const JsWriter = require('../../codegen/JsWriter');

module.exports = {

    "with no handlers": function (test) {

        var req = new BlockingReq(JS.ID('foo'), []);

        test.deepEqual(new JsWriter().generateJs(req).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', 'foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'null' ],
                        [ 'null' ] ] ] ] ]);

        test.done();
    },

    "with one handler": function (test) {

        // what the hell is a handler? a CFNode??
        // a blocking req has two points of attachment: its handlers
        // a handler is a fn expression, either a def or a ref

        var req = new BlockingReq(JS.ID('foo'), [], JS.fnDef(['args'], JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.num('42'))))));

        // let's say the next stmt is a fn call with no args -- we could optimize by detecting that

        test.deepEqual(new JsWriter().generateJs(req).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', 'foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', 'bar' ], [ 'num', '42' ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);

        test.done();
    }
};

