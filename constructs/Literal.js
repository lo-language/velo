/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


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
 * todo break these out into their own classes?
 *
 * @param context
 */
__.prototype.compile = function (context) {

    switch (this.type) {

        case 'boolean':
            return JS.bool(this.value ? 'true' : 'false');
            break;

        case 'number':
            return JS.num(this.value);
            break;

        case 'string':
            return JS.string(this.value);
            break;
    }
};

module.exports = __;