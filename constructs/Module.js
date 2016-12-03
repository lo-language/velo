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
const JsStmt = require('../codegen/JsStmt');
const JsFunction = require('../codegen/JsFunction');
const Context = require('../codegen/Context');


/**
 * A module definition; the root of an AST. Called by the ASTBuilder
 */
var __ = function (refs, defs) {

    this.refs = refs;
    this.defs = defs;
    this.exports = {};
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'module',
        definitions: this.defs.map(def => def.getAst()),
        references: this.refs
    };
};

/**
 * Compiles this module to JS.
 *
 */
__.prototype.compile = function () {


    // should module definitions be captured as a linked list like statements?

    // how do we handle attaching empty stmts (what you get from a const def) here???

    var context = new Context();

    var body = JsStmt.strictMode();

    // a bunch of constants
    this.defs.forEach(def => {
        body.attach(def.compile(context));
    });

    // var exports = this.getExports();

    // attach all the export statements

    // var pairs = Object.keys(this.getExports()).map(
    //     name => [JS.string(name), exports[name]]);
    //
    // body.attach(JsStmt.return(JS.objLiteral(pairs)));

    // wrap our service constant definitions in a scope to prevent collisions with other modules
    // export our constants via a return statement

    return body;
};

module.exports = __;