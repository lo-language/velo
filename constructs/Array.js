/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * An array literal
 *
 * @param elements
 */
var __ = function (elements) {

    this.elements = elements;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'array',
        elements: this.elements.map(elem => elem.getAst())
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return JS.arrayLiteral(
        this.elements.map(item => {
            return item.compile(context);
    }));
};

module.exports = __;