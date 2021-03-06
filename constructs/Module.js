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
const LoContext = require('../compiler/LoContext');
const StmtList = require('./StmtList');
const CFNode = require('../compiler/CFNode');
const JsWriter = require('../codegen/JsWriter');
const LoConstruct = require('./LoConstruct');


class Module extends LoConstruct {

    /**
     * A module definition; the root of an AST.
     */
    constructor(defs, deps) {

        super();

        this.deps = [];
        this.defs = defs;
        this.deps = deps || [];
        this.exports = {};
        this.name = 'UNK';
        this.path = 'UNK';
    }

    /**
     * Sets the name of this module
     */
    setInfo(id, path) {

        this.name = id;
        this.path = path;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return this.deps.length > 0 ? {
            type: 'module',
            deps: this.deps.map(def => def.getAst()),
            definitions: this.defs.map(def => def.getAst()),
        } : {
            type: 'module',
            definitions: this.defs.map(def => def.getAst()),
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['module'].concat(this.defs.map(def => def.getTree()));
    }

    /**
     * Compiles this module to JS.
     *
     * Compiling a module discovers its dependencies.
     */
    compile(errorListener) {

        var loContext = new LoContext();

        loContext.setErrorListener(errorListener);

        // todo another compensating hack because of compiling tail-first
        // compile all the deps right here

        this.deps.forEach(function (dep) {

            // ignore the return value, which is just a no-op
            dep.compile(loContext);
        });

        var t = this;

        var firstStmt = new CFNode();
        var lastStmt = firstStmt;

        this.defs.forEach(def => {
            lastStmt = lastStmt.setNext(def.compile(loContext));
        });

        // bail if we had errors
        if (loContext.hasErrors()) {
            throw new Error("compilation failed");
        }

        var exports = loContext.getConstants().map(c => {
            return [JS.string(c.name), JS.ID('$' + c.name)];
        });

        // try a return here, see if it works
        lastStmt = lastStmt.setNext(new CFNode(
            JS.return(
                JS.objLiteral(exports)
            )
        ));

        // all other compile()s return IR; this returns JS? NASTY
        return new JsWriter().generateJs(firstStmt);
    }
}


module.exports = Module;