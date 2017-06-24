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

const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports = {

    "array": function (test) {

        var ar = new Lo.array([new Lo.number(12), new Lo.number(22)]);

        test.deepEqual(ar.getTree(), ['array', 12, 22]);

        test.done();
    },

    "arrayPush": function (test) {

        var expr = new Lo.arrayPush('+>', new Lo.number(12), new Lo.identifier('foo'));

        test.deepEqual(expr.getTree(), [ '+>', 12, [ 'id', 'foo' ] ]);

        test.done();
    },

    "assignment": function (test) {

        var expr = new Lo.assign(new Lo.identifier('foo'), new Lo.number('17'));

        test.deepEqual(expr.getTree(), [ 'set!', [ 'id', 'foo' ], 17 ]);

        test.done();
    },

    "binary op": function (test) {

        var expr = new Lo.binaryOpExpr('>', new Lo.identifier('foo'), new Lo.number('17'));

        test.deepEqual(expr.getTree(), [ '>', [ 'id', 'foo' ], 17 ]);

        test.done();
    },

    "boolean": function (test) {

        var expr = new Lo.boolean(true);

        test.deepEqual(expr.getTree(), true);

        test.done();
    },

    "conditional expr": function (test) {

        var expr = new Lo.condExpr(new Lo.boolean(true), new Lo.identifier('foo'), new Lo.identifier('bar'));

        test.deepEqual(expr.getTree(), [ 'cond', true, [ 'id', 'foo' ], [ 'id', 'bar' ] ]);

        test.done();
    },

    "conditional branch": function (test) {

        // abusing lack of validation by passing exprs instead of stmtlists
        var expr = new Lo.conditional(new Lo.boolean(true), new Lo.identifier('foo'), new Lo.identifier('bar'));

        test.deepEqual(expr.getTree(), [ 'branch', true, [ 'id', 'foo' ], [ 'id', 'bar' ] ]);

        test.done();
    },

    "constant": function (test) {

        var expr = new Lo.constant('bar', new Lo.number('48'));

        test.deepEqual(expr.getTree(), [ 'def', 'bar', 48]);

        test.done();
    },

    "destructure": function (test) {

        var expr = new Lo.destructure(['foo', 'bar', 'baz']);

        test.deepEqual(expr.getTree(), [ 'destructure', 'foo', 'bar', 'baz' ]);

        test.done();
    },

    "string": function (test) {

        var expr = new Lo.string("bearzles");

        test.deepEqual(expr.getTree(), ['string', "bearzles"]);

        test.done();
    }
};

