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
const Context = require('../codegen/Context');
const vm = require('vm');
const Q = require('q');

/**
 * A module definition; the root of an AST. Called by the ASTBuilder
 */
var __ = function (defs) {

    this.deps = [];
    this.defs = defs;
    this.exports = {};
};

/**
 * Sets the name of this module
 */
__.prototype.setName = function (name) {

    this.name = name;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'module',
        definitions: this.defs.map(def => def.getAst()),
    };
};

/**
 * Compiles this module to JS.
 *
 * Compiling a module discovers its dependencies.
 */
__.prototype.compile = function (registry) {

    // create a root context
    var context = new Context();

    context.setRegistry(registry);

    var stmts = null;

    for (var i = this.defs.length - 1; i >= 0; i--) {
        stmts = JS.stmtList(this.defs[i].compile(context), stmts);
    }

    var exports = context.getConstants().map(c => {
        return [JS.string('$' + c.name), c.value];
    });

    // try a return here, see if it works
    stmts.attach(JS.stmtList(
        JS.return(
            JS.objLiteral(exports)
        )
    ));

    return stmts;
};


module.exports = __;