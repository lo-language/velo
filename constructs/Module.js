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

/**
 * A module definition; the root of an AST. Called by the ASTBuilder
 */
var __ = function (defs) {

    this.deps = [];
    this.defs = defs;
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

    return {
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
__.prototype.compile = function (registry) {

    // create a root context
    var context = new Context();

    context.setRegistry(registry);

    var stmts = null;

    for (var i = this.defs.length - 1; i >= 0; i--) {
        stmts = JS.stmtList(this.defs[i].compile(context), stmts);
    }

    var errors = context.getErrors();

    if (errors.length > 0) {
        console.error(errors);
    }

    var exports = context.getConstants().map(c => {
        return [JS.string('$' + c.name), JS.ID('$' + c.name)];
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