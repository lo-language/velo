/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A scan statement.
 *
 * @param over
 * @param into
 */
var __ = function (over, into) {

    this.over = over;
    this.into = into;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'scan',
        over: this.over.getAst(),
        into: this.into.getAst()
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