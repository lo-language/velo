/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/


"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * An array concatenation expression (including strings)
 *
 * @param left
 * @param right
 */
var __ = function (left, right) {

    this.left = left;
    this.right = right;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'concat',
        left: this.left.getAst(),
        right: this.right.getAst()
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'concat',
        this.left.getTree(),
        this.right.getTree(),
    ];
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.hasType = function (type) {

    return this.left.hasType(type) && this.right.hasType(type);
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    const left = this.left.compile(context);
    const right = this.right.compile(context);

    // see if we know the type at compile time
    if (this.left.hasType('string') && this.right.hasType('string')) {
        return JS.add(left, right);
    }

    // kick it to the runtime
    return JS.runtimeCall('concat', [left, right]);
};

module.exports = __;