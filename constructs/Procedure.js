/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A procedure definition
 *
 * @param params
 * @param body
 */
var __ = function (params, body) {

    this.params = params;
    this.body = body;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'procedure',
        params: this.params,
        body: this.body ? this.body.getAst() : null
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