/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A constant definition
 */
var __ = function (params) {

    this.params = params;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'event',
        params: this.params
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