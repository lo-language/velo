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
const BranchContext = require('../codegen/BranchContext');


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

    // create a branch context here for the loop body

    var bc = new BranchContext(context);
    var body = this.body.compile(bc);

    // test both the current context and the loop-body context for discontinuities
    // in either the loop condition or the loop body, respectively

    if (context.isContinuous() && bc.isContinuous()) {

        // no discontinuities in the loop at all, compile to a target language loop
        return JS.while(condition, body);
    }

    // gotta do it the hard way

    var loop = context.createAsyncLoop(condition, body);

    var loopCall = JS.stmtList(JS.exprStmt(
        JS.fnCall(JS.ID("setImmediate"), [JS.runtimeCall('doAsync', [loop.id])])));

    // connect the body to the loop entry point to create the loop
    bc.connect(loopCall);

    return JS.stmtList(loop.def, JS.stmtList(JS.exprStmt(JS.fnCall(loop.id, []))));
};


module.exports = __;