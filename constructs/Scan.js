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
const CFNode = require('../compiler/CFNode');
const JsWriter = require('../codegen/JsWriter');
const LoConstruct = require('./LoConstruct');


class Scan extends LoConstruct {

    /**
     * A scan statement. Scan is different from something like "for every X in Y" because
     * a) there's no item referent in the same scope as scan, if it's named, it's in a subscope
     * b) it's more like an emitter of a sequence (a msg source) than a control structure like while
     *
     * @param over
     * @param into
     */
    constructor(over, into) {

        super();
        this.over = over;
        this.into = into;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'scan',
            over: this.over.getAst(),
            into: this.into.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'scan',
            this.over.getTree(),
            this.into.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        var over = this.over.compile(sourceCtx, targetCtx);
        var into = this.into.compile(sourceCtx, targetCtx);

        return new CFNode(writer => {

            // we could alternately call writer.sub() or something if we don't want to require JsWriter
            // we can't do genJs because the proc isn't a handler? we need to build more of a while loop cond thing around it?
            // right, we can't 'edit' the proc
            return JS.exprStmt(JS.utilCall('scan', [
                over, into.getJs(new JsWriter())
            ]));
        });
    }
}

module.exports = Scan;