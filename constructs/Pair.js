/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A set pair literal
 *
 * @param key
 * @param value
 */
var __ = function (key, value) {

    this.key = key;
    this.value = value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'pair',
        key: this.key.getAst(),
        value: this.value.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return [this.key.compile(context), this.value.compile(context)];
};

module.exports = __;