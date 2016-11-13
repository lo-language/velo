/**
 * Created by seth on 11/12/16.
 */

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

    // todo could we put move this into the parser somehow?

    if (this.head == null) {
        return new JsStmt();
    }

    // hooray for Lisp!

    return this.tail ?
        this.head.compile(context).attach(this.tail.compile(context)) :
        this.head.compile(context);
};

module.exports = __;