/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A module definition.
 */
var __ = function (refs, defs) {

    this.refs = refs;
    this.defs = defs;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'module',
        definitions: this.defs.map(def => def.getAst()),
        references: this.refs
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