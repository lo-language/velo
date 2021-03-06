/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/26/17.
 */

"use strict";

const CFNode = require('../../compiler/CFNode');
const Writer = require('../../codegen/JsWriter');
const JS = require('../../codegen/JsPrimitives');

module.exports["vanilla"] = {

    "render intact": function (test) {

        var writer = new Writer();

        var node1 = new CFNode(JS.exprStmt(JS.assign(JS.ID('foo'), JS.num('42'))));

        test.deepEqual(writer.generateJs(node1).renderJs(), 'foo = 42;\n');

        var node2 = new CFNode(JS.exprStmt(JS.assign(JS.ID('bar'), JS.num('57'))));

        node1.append(node2);

        test.deepEqual(writer.generateJs(node1).renderJs(), 'foo = 42;\nbar = 57;\n');

        test.done();
    },

    "render non-intact": function (test) {

        var writer = new Writer();

        var node1 = new CFNode(JS.exprStmt(JS.assign(JS.ID('foo'), JS.num('42'))));

        test.deepEqual(writer.generateJs(node1).renderJs(), 'foo = 42;\n');

        var node2 = new CFNode(JS.exprStmt(JS.assign(JS.ID('bar'), JS.num('57'))));

        node1.append(node2);

        test.deepEqual(writer.generateJs(node1).renderJs(), 'foo = 42;\nbar = 57;\n');

        test.done();
    }
};

module.exports["tail capture"] = {

    "basic capture": function (test) {

        var writer = new Writer();

        // white box test

        var tail = JS.stmtList(JS.assign(JS.ID('foo'), JS.num('42')));

        writer.tail = tail;

        test.deepEqual(writer.captureTail().renderTree(), tail.renderTree());
        test.equal(writer.tail, null);

        test.done();
    },

    "wrap tail in continuation": function (test) {

        var writer = new Writer();

        // white box test

        var tail = JS.stmtList(JS.assign(JS.ID('foo'), JS.num('42')));

        writer.tail = tail;

        test.deepEqual(writer.wrapTail().renderTree(), [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ]);
        test.deepEqual(writer.tail.renderTree(), JS.stmtList(JS.fnDef([], tail, 'k0')).renderTree());

        test.done();
    },

    "doesn't double-wrap continuation": function (test) {

        // white box test

        var tail = JS.stmtList(JS.assign(JS.ID('foo'), JS.num('42')));

        var writer = new Writer().branch(tail);

        var wrapped = writer.wrapTail();

        test.deepEqual(wrapped.renderTree(), [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ]);
        test.deepEqual(writer.tail.renderTree(), JS.stmtList(JS.fnDef([], tail, 'k0')).renderTree());

        // should be almost a no-op

        writer = new Writer().branch(wrapped);

        test.deepEqual(writer.wrapTail().renderTree(), [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ]);
        test.equal(writer.tail, null);

        test.done();
    }
};

module.exports["cond"] = {

    "render intact": function (test) {

        var writer = new Writer();

        // make a cond node
        var node1 = new CFNode(writer => {

            return JS.cond(JS.ID('foo'), JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.num(14)))));
        });

        var node2 = new CFNode(JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('57'))));

        test.deepEqual(writer.generateJs(node1).renderJs(), 'if (foo) {\nbar = 14;\n}\n');

        node1.append(node2);

        test.deepEqual(writer.generateJs(node1).renderJs(), 'if (foo) {\nbar = 14;\n}\nbaz = 57;\n');

        test.done();
    },

    // "render intact with one level of continuation": function (test) {
    //
    //     var writer = new Writer();
    //
    //     writer.push();
    //
    //     // make a cond node
    //     var node1 = new CFNode();
    //     var node2 = new CFNode(JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('57'))));
    //
    //     node1.getStmt = function (targetCtx) {
    //
    //         return JS.cond(JS.ID('foo'), JS.stmtList(JS.exprStmt(JS.assign(JS.ID('bar'), JS.num(14)))));
    //     };
    //
    //     test.deepEqual(writer.generateJs(node1).renderJs(), 'if (foo) {\nbar = 14;\n}\nk1();\n');
    //
    //     node1.append(node2);
    //
    //     test.deepEqual(writer.generateJs(node1).renderJs(), 'if (foo) {\nbar = 14;\n}\nbaz = 57;\nk1();\n');
    //
    //     test.done();
    // },
    //
    // "render non-intact": function (test) {
    //
    //     var writer = new Writer();
    //
    //     // make a cond node
    //     var node1 = new CFNode(null, false);
    //     var node2 = new CFNode(JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('57'))));
    //
    //     node1.getStmt = function (Writer) {
    //
    //         var trueBranch = new CFNode(JS.exprStmt(JS.assign(JS.ID('bar'), JS.num(14))));
    //
    //         return JS.cond(JS.ID('foo'), Writer.generateJs(trueBranch));
    //     };
    //
    //     test.deepEqual(writer.generateJs(node1).renderJs(), 'if (foo) {\nbar = 14;\n}\n');
    //
    //     node1.append(node2);
    //
    //     test.deepEqual(writer.generateJs(node1).renderJs(),
    //         'if (foo) {\nbar = 14;\nk1();\n}\nfunction k1 () {\n\nbaz = 57;\n};\n');
    //
    //     test.done();
    // },
    //
    // "render non-intact with one level of cont": function (test) {
    //
    //     var writer = new Writer();
    //
    //     writer.push();
    //
    //     // make a cond node
    //     var node1 = new CFNode(null, false);
    //     var node2 = new CFNode(JS.exprStmt(JS.assign(JS.ID('baz'), JS.num('57'))));
    //
    //     node1.getStmt = function (Writer) {
    //
    //         var trueBranch = new CFNode(JS.exprStmt(JS.assign(JS.ID('bar'), JS.num(14))));
    //
    //         return JS.cond(JS.ID('foo'), Writer.generateJs(trueBranch));
    //     };
    //
    //     test.deepEqual(writer.generateJs(node1).renderJs(), 'if (foo) {\nbar = 14;\nk1();\n}\n');
    //
    //     node1.append(node2);
    //
    //     test.deepEqual(writer.generateJs(node1).renderJs(),
    //         'if (foo) {\nbar = 14;\nk2();\n}\nfunction k2 () {\n\nbaz = 57;\nk1();\n};\n');
    //
    //     test.done();
    // }
};
