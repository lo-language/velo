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
__.prototype.compile = function (registry, errorListener) {

    // create a root context
    var context = new LoContext();

    context.setRegistry(registry);
    context.setErrorListener(errorListener);

    // todo another compensating hack because of compiling tail-first
    // compile all the deps right here

    this.deps.forEach(function (dep) {

        // ignore the return value, which is just a no-op
        dep.compile(context);
    });

    var t = this;

    // since module defs aren't captured as a linkedlist
    // todo fix this?

    function linkDefs (idx) {

        if (idx < t.defs.length) {
            return new StmtList(t.defs[idx], linkDefs(idx + 1));
        }

        return null;
    }

    var stmts = linkDefs(0).compile2(context);

    // bail if we had errors
    if (context.hasErrors()) {
        throw new Error("compilation failed");
    }

    var exports = context.getConstants().map(c => {
        return [JS.string(c.name), JS.ID('$' + c.name)];
    });

    // try a return here, see if it works
    stmts.append(new CFNode(
        JS.return(
            JS.objLiteral(exports)
        )
    ));

    return stmts;
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

    var lastStmt = new CFNode();

    this.defs.forEach(def => {
        lastStmt = lastStmt.setNext(new CFNode(def.compile2(loContext)));
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

    return lastStmt.getRoot();
};


module.exports = __;