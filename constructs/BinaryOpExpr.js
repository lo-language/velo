/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A binary operator expression
 *
 * @param op
 * @param left
 * @param right
 */
var __ = function (op, left, right) {

    this.op = op;
    this.left = left;
    this.right = right;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'op',
        op: this.op,
        left: this.left.getAst(),
        right: this.right.getAst()
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        this.op,
        this.left.getTree(),
        this.right.getTree()
    ];
};


/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var left = this.left.compile(context);
    var right = this.right.compile(context);

//    todo - make sure both sides are defined
//    could relax this if we want to allow declaration after usage
//    should also factor this out into a getValue() maybe

//    if (node.left.jsVal === undefined) {
//        throw new Error("left operand not defined");
//    }
//
//    if (node.right.jsVal === undefined) {
//        throw new Error("right operand not defined");
//    }

    var op = this.op;

    switch (op) {

        case 'concat':
            return JS.runtimeCall('concat', [left, right]);

        case 'and':
            return JS.logicalAnd(left, right);

        case 'or':
            return JS.logicalOr(left, right);

        case '==':
            return JS.strictEqual(left, right);

        case '!=':
            return JS.notEqual(left, right);

        case '<':
            return JS.lt(left, right);

        case '>':
            return JS.gt(left, right);

        case '<=':
            return JS.lte(left, right);

        case '>=':
            return JS.gte(left, right);

        case '+':
            return JS.add(left, right);

        case '-':
            return JS.sub(left, right);

        case '*':
            return JS.mul(left, right);

        case '/':
            return JS.div(left, right);

        case '%':
            return JS.mod(left, right);
    }

    throw new Error("unknown operator: " + op);
};

module.exports = __;