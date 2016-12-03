/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
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
const JsStmt = require('../codegen/JsStmt');
const Procedure = require('./Procedure');

/**
 * A constant definition
 */
var __ = function (name, value) {

    this.name = name;
    this.value = value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'constant',
        name: this.name,
        value: this.value.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // insert into the symbol table
    context.define(this.name);

    const jsID = '$' + this.name;

    var value = this.value.compile(context);
    var result = new JsStmt(JS.constDecl(jsID, value));

    if (context.isRoot()) {

        // we're defining a module-level constant, so export it

        result.attach(new JsStmt(JS.exprStmt(
            JS.assign(
                JS.select(
                    JS.select(JS.ID("module"), "exports"),
                    jsID
                ),
                JS.ID(jsID)
            ))));
    }

    return result;
};

module.exports = __;