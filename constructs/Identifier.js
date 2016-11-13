/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * An identifer
 */
var __ = function (name, nameSpace) {

    this.name = name;
    this.nameSpace = nameSpace;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    var result = {
        type: "id",
        name: this.name
    };

    if (this.nameSpace) {
        result.scope = this.nameSpace;
    }

    return result;
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

};

module.exports = __;