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
const LoConstruct = require('./LoConstruct');
const ArrayType = require('../compiler/ArrayType');


class Concat extends LoConstruct {

    /**
     * An array concatenation expression (including strings)
     *
     * @param left
     * @param right
     */
    constructor(left, right) {

        super();

        this.left = left;
        this.right = right;
        this.type = this.left.type;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'concat',
            left: this.left.getAst(),
            right: this.right.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'concat',
            this.left.getTree(),
            this.right.getTree(),
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        const left = this.left.compile(sourceCtx, targetCtx);
        const right = this.right.compile(sourceCtx, targetCtx);

        // see if we know the type at compile time
        if (this.left.type === ArrayType.STRING &&
            this.right.type === ArrayType.STRING) {
        // if (this.left.hasType && this.left.hasType('string')
        //     && this.right.hasType && this.right.hasType('string')) {
            return JS.add(left, right);
        }

        // kick it to the runtime
        return JS.utilCall('concat', [left, right]);
    }
}

module.exports = Concat;