/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A subscript expression
 *
 * @param array
 * @param index
 */
var __ = function (array, index) {

    this.array = array;
    this.index = index;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'subscript',
        list: this.array.getAst(),
        index: this.index.getAst()
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