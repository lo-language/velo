/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A literal value
 */
var __ = function (type, value) {

    this.type = type;
    this.value = value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    // ??? might not want to return an actual bool here - number literals are kept as strings

    return {
        type: this.type,
        val: this.value
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

};

module.exports = __;