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
const LoConstruct = require('./LoConstruct');


class ArrayPush extends LoConstruct {

    /**
     * An array push statement.
     *
     * @param op
     * @param left      expr
     * @param right     expr
     */
    constructor(op, left, right) {

        super();
        this.op = op;
        this.left = left;
        this.right = right;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: this.op,
            left: this.left.getAst(),
            right: this.right.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [this.op, this.left.getTree(), this.right.getTree()];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        var left = this.left.compile(sourceCtx, targetCtx);
        var right = this.right.compile(sourceCtx, targetCtx);

        // todo probably want to add some runtime checks

        if (this.op == 'push-front') {
            return JS.exprStmt(JS.fnCall(JS.select(right, 'unshift'), [left]));
        }
        else {
            return JS.exprStmt(JS.fnCall(JS.select(left, 'push'), [right]));
        }
    }
}


module.exports = ArrayPush;