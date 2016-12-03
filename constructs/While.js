/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const AsyncWhile = require('../codegen/AsyncWhile');
const JsStmt = require('../codegen/JsStmt');


/**
 * A while statement.
 */
var __ = function (cond, body) {

    this.cond = cond;
    this.body = body;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'iteration',
        condition: this.cond.getAst(),
        statements: this.body.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var condition = this.cond.compile(context);
    var wrapper = context.wrapper;

    var body = this.body.compile(context);

    if (wrapper.isEmpty() && body.isAsync() == false) {
        return JsStmt.while(condition, body);
    }

    // i think it's kinda weird to pass the wrapper in like this...
    // but we can't apply the wrapper till after we've attached a next stmt...
    return new AsyncWhile(condition, body, wrapper);
};

module.exports = __;