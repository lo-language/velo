/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * The machine does not isolate us from the great problems of nature but
 * plunges us more deeply into them.
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoContext = require('../compiler/LoContext');
const StmtList = require('./StmtList');
const CFNode = require('../compiler/CFNode');
const JsWriter = require('../codegen/JsWriter');
const vm = require('vm');

/**
 * A module definition; the root of an AST. Called by the ASTBuilder
 */
var __ = function (defs, deps) {

    this.deps = [];
    this.defs = defs;
    this.deps = deps || [];
    this.exports = {};
    this.name = 'UNK';
    this.path = 'UNK';
};

/**
 * Sets the name of this module
 */
__.prototype.setInfo = function (id, path) {

    this.name = id;
    this.path = path;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return this.deps.length > 0 ? {
        type: 'module',
        deps: this.deps.map(def => def.getAst()),
        definitions: this.defs.map(def => def.getAst()),
    } : {
        type: 'module',
        definitions: this.defs.map(def => def.getAst()),
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return ['module'].concat(this.defs.map(def => def.getTree()));
};


/**
 * Compiles this module to JS.
 *
 * Compiling a module discovers its dependencies.
 */
__.prototype.compile2 = function (registry, errorListener) {

    var loContext = new LoContext();

    loContext.setRegistry(registry);
    loContext.setErrorListener(errorListener);

    // todo another compensating hack because of compiling tail-first
    // compile all the deps right here

    this.deps.forEach(function (dep) {

        // ignore the return value, which is just a no-op
        dep.compile2(loContext);
    });

    var t = this;

    var firstStmt = new CFNode();
    var lastStmt = firstStmt;

    this.defs.forEach(def => {
        lastStmt = lastStmt.setNext(def.compile2(loContext));
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

    // all other compiles return IR; this returns JS? NASTY
    return new JsWriter().generateJs(firstStmt);
};


module.exports = __;