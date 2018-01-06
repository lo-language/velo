/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const CFNode = require('../compiler/CFNode');
const BranchNode = require('../compiler/BranchNode');
const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');
const StmtContext = require('../compiler/StmtContext');

class While extends LoConstruct {

    /**
     * A while statement.
     */
    constructor(cond, body) {

        super();
        this.cond = cond;
        this.body = body;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'iteration',
            condition: this.cond.getAst(),
            statements: this.body.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'while',
            this.cond.getTree(),
            this.body.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param loContext
     * @param targetCtx
     * @returns {*}
     */
    compile(loContext, targetCtx) {

        // we have two strategies at our disposal: native loop and recursive loop
        // we use the native loop when we can; otherwise must use our recursive loop

        var condCtx = new StmtContext(loContext);
        var loopCond = this.cond.compile(condCtx);
        var loopBody = this.body.compile(loContext);

        // if neither part is broken, can use a native while loop

        if (condCtx.hasWrapper() == false && loopBody.isIntact()) {
            return new CFNode(function (writer) {
                return JS.while(loopCond, writer.branch().generateJs(loopBody))
            });
        }

        // can't use a native loop; construct a recursive loop
        var loopName = loContext.getNextLoopName();

        // write the loop predicate as a conditional
        // any following statements are rendered in the false branch
        // note that we don't use our BranchNode here because we want different behavior

        var fnBody = new CFNode(writer => {
            return JS.cond(
                loopCond,
                writer.branch().generateJs(loopBody),
                writer.captureTail()
            );
        });

        // wrap the condition in any wrapping reqs
        fnBody = condCtx.wrap(fnBody);

        // form the loop by adding a recursive call to the loop body
        // use setImmediate to avoid blowing up the stack
        // possible optimization lurking here if the loop ends with a request: can use loop fn as handlers

        loopBody.append(new CFNode(JS.exprStmt(
            JS.fnCall(JS.ID("setImmediate"), [JS.runtimeCall('doAsync', [JS.ID(loopName)])]))));

        return new CFNode(writer => {
            return JS.exprStmt(JS.fnCall(JS.fnDef([], writer.generateJs(fnBody), loopName), []));
        }, false);
    }
}


module.exports = While;
