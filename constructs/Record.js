/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A record literal
 *
 * @param fields
 */
var __ = function (fields) {

    this.fields = fields;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'record',
        fields: this.fields.map(field => field.getAst())
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return JS.objLiteral(this.fields.map(field => {
        return field.compile(context);
    }));
};

module.exports = __;