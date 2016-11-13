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

    // procedures are *run-time* constants -- we just can't know their values (addresses) at compile-time

    if (this.value instanceof Procedure) {

        var id = '$' + this.name;
        context.define(this.name, JS.ID(id), true);
        return new JsStmt.constDecl(id, this.value.compile(context));
    }

    context.define(this.name, this.value.compile(context));

    // return an empty statement to allow attachment
    return new JsStmt();
};

module.exports = __;