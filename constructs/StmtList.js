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
const JsStmt = require('../codegen/JsStmt');

/**
 * A linked list of statements.
 */
var __ = function (head, tail) {

    this.head = head;
    this.tail = tail;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'stmt_list',
        head: this.head ? this.head.getAst() : null,
        tail: this.tail ? this.tail.getAst() : null
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    if (this.head == null) {
        return new JsStmt();
    }

    // hooray for Lisp!

    // we compile the tail first so earlier statements can see what comes after them

    return this.tail ?
        context.compileStmt(this.head).attach(context.compileStmt(this.tail)) :
        context.compileStmt(this.head);
};

module.exports = __;