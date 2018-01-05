/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A subscript expression
 *
 * @param array
 * @param start
 * @param end
 */
var __ = function (array, start, end) {

    this.array = array;
    this.start = start;
    this.end = end;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    var res = {
        type: 'slice',
        list: this.array.getAst()
    };

    if (this.start) {
        res.start = this.start.getAst();
    }

    if (this.end) {
        res.end = this.end.getAst();
    }

    return res;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'slice',
        this.array.getTree(),
        this.start ? this.start.getTree() : null,
        this.end ? this.end.getTree() : null
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    // lean on JS slice since it has the same semantics

    var list = this.array.compile(sourceCtx, targetCtx);
    var start = this.start ? this.start.compile(sourceCtx, targetCtx) : JS.num('0');
    var end = this.end ? this.end.compile(sourceCtx, targetCtx) : null;

    return JS.fnCall(
        JS.select(list, 'slice'),
        end ? [start, JS.add(end, JS.num('1'))] : [start]
    );
};

module.exports = __;