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
 * A while statement.
 */
var __ = function (cond, body) {

    this.cond = cond;
    this.body = body;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'iteration',
        condition: this.cond.getAst(),
        statements: this.body.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var condition = this.cond.compile(context);
    var body = this.body.compile(context);

    if (body.async) {

        // join the body to the wrapper function via setImmediate to form a loop in a way that won't break the stack
        // (this is me trying to emulate tail-recursion)

        body.attach(new JsStmt(JS.exprStmt(
            JS.fnCall(JS.ID("setImmediate"), [JS.runtimeCall('doAsync', [JS.ID('loop')])]))));

        // see if there's a next statement
        // var cond = this.next ? JS.cond(this.cond, this.body, this.next) : JS.cond(condition, body);

        var loopDecl = new JsStmt(JS.letDecl('loop', JS.fnDef([], new JsStmt(JS.cond(condition, body)))));

        return loopDecl.attach(new JsStmt(JS.exprStmt(JS.fnCall(JS.ID('loop'), []))));
    }

    return JS.while(condition, body);
};

// let the conditional create the extra cont?
// cont = context.createContStmt();
// loop = context.createContStmt();

module.exports = __;