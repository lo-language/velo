/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
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
const Identifier = require('./Identifier');
const CFNode = require('../compiler/CFNode');
const LoConstruct = require('./LoConstruct');


class Assignment extends LoConstruct {

    /**
     * An assignment statement.
     *
     * @param left      expr
     * @param right     expr
     */
    constructor(left, right) {

        super();
        this.left = left;
        this.right = right;

        // todo now this is an ugly hack, right here
        if (typeof left.setLvalue == 'function') {
            left.setLvalue();
        }
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'assign',
            left: this.left.getAst(),
            right: this.right.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'set!',
            this.left.getTree(),
            this.right.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param last
     */
    compile(sourceCtx, last) {

        var left = this.left.compile(sourceCtx, last);
        var right = this.right.compile(sourceCtx, last);

        // todo this implies block-level scoping

        // if the LHS is a bare ID...
        if (this.left instanceof Identifier) {

            var name = this.left.name;

            // validate we're not assigning to a constant
            if (sourceCtx.isConstant(name)) {
                sourceCtx.attachError(this.left, "can't assign to a constant (" + name + ")");
            }

            // declare if a new var
            if (sourceCtx.has(name) == false) {
                sourceCtx.declare(name);
                // targetCtx.declareVar(name); // todo - get JS vars from target ctx, not source ctx
            }
        }

        return new CFNode(JS.exprStmt(JS.assign(left, right)));

        // this was genius
        // above comment inserted by my slightly tipsy wife regarding definitely non-genius code later removed - SP
    }
}

module.exports = Assignment;