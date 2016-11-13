/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A destructuring assignment.
 */
var __ = function (names) {

    this.names = names;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'destructure',
        fields: this.names
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